import { NotionToMarkdown } from "notion-to-md";
import { notion } from "./client.js";
import { downloadInlineImage } from "./images.js";

const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Convert a Notion page's body blocks to markdown.
 * Downloads inline images and rewrites their URLs to local paths.
 */
export async function pageToMarkdown(
  pageId: string,
  category: string,
  slug: string
): Promise<string> {
  const blocks = await n2m.pageToMarkdown(pageId);
  let md = n2m.toMarkdownString(blocks).parent;

  // Download and rewrite image URLs
  // notion-to-md outputs images as ![caption](url)
  const imageRegex = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;
  const replacements: Array<{ original: string; replacement: string }> = [];
  let match: RegExpExecArray | null;
  let imageIndex = 0;

  while ((match = imageRegex.exec(md)) !== null) {
    const [original, caption, url] = match;
    imageIndex++;
    const imageName = caption
      ? caption.replace(/[^a-zA-Z0-9-_]/g, "-").substring(0, 50)
      : `image-${imageIndex}`;
    try {
      const localPath = await downloadInlineImage(
        url,
        category,
        slug,
        imageName,
        pageId
      );
      replacements.push({ original, replacement: `![${caption}](${localPath})` });
    } catch (err) {
      console.warn(`  Warning: Failed to download inline image: ${url}`, err);
    }
  }

  for (const { original, replacement } of replacements) {
    md = md.replace(original, replacement);
  }

  return md.trim();
}

/**
 * Extract plain text from a Notion rich text array.
 */
export function richTextToPlain(
  richText: Array<{ plain_text: string }> | undefined | null
): string {
  if (!richText || richText.length === 0) return "";
  return richText.map((t) => t.plain_text).join("");
}

/**
 * Split a rich text field (one item per line) into a string array.
 */
export function richTextToArray(
  richText: Array<{ plain_text: string }> | undefined | null
): string[] {
  const text = richTextToPlain(richText);
  if (!text) return [];
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Extract multi-select values as a string array.
 */
export function multiSelectToArray(
  multiSelect: Array<{ name: string }> | undefined | null
): string[] {
  if (!multiSelect || multiSelect.length === 0) return [];
  return multiSelect.map((o) => o.name);
}

/**
 * Extract a select value as a string.
 */
export function selectToString(
  select: { name: string } | undefined | null
): string {
  return select?.name || "";
}

/**
 * Extract a URL property value.
 */
export function urlProperty(value: string | undefined | null): string {
  return value || "";
}

/**
 * Extract a checkbox property value.
 */
export function checkboxValue(value: boolean | undefined | null): boolean {
  return value === true;
}

/**
 * Extract a number property value.
 */
export function numberValue(value: number | undefined | null): number {
  return value ?? 0;
}

/**
 * Extract a date property value as formatted string.
 */
export function dateToString(
  date: { start: string; end?: string | null } | undefined | null
): string {
  if (!date || !date.start) return "";
  // If the date includes time, format as "YYYY-MM-DD HH:mm"
  if (date.start.includes("T")) {
    const d = new Date(date.start);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  }
  // Date only — append default time
  return `${date.start} 12:00`;
}

/**
 * Extract a file property URL (first file).
 */
export function filePropertyUrl(
  files:
    | Array<{
        type: string;
        file?: { url: string };
        external?: { url: string };
        name?: string;
      }>
    | undefined
    | null
): string | null {
  if (!files || files.length === 0) return null;
  const first = files[0];
  if (first.type === "file" && first.file) return first.file.url;
  if (first.type === "external" && first.external) return first.external.url;
  return null;
}
