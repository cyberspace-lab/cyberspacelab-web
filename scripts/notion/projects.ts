import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { notion, DB_IDS, getDataSourceId } from "./client.js";
import { serializeProjectFrontmatter } from "./frontmatter.js";
import { downloadNotionImage } from "./images.js";
import {
  pageToMarkdown,
  richTextToPlain,
  selectToString,
  checkboxValue,
  dateToString,
  filePropertyUrl,
} from "./markdown.js";
import type { Project } from "./types.js";
import type {
  PageObjectResponse,
  QueryDataSourceResponse,
} from "@notionhq/client/build/src/api-endpoints.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, "../../src/content/projects");

async function processProjectPage(
  page: PageObjectResponse
): Promise<Project> {
  const props = page.properties as any;
  const slug = richTextToPlain(props.slug?.rich_text);

  if (!slug) {
    throw new Error(`Project page ${page.id} has no slug`);
  }

  console.log(`  Processing project: ${slug}`);

  const title = richTextToPlain(props.title?.title);
  const shortname = richTextToPlain(props.shortname?.rich_text);
  const description = richTextToPlain(props.description?.rich_text);
  const date = dateToString(props.date?.date);
  const draft = checkboxValue(props.draft?.checkbox);
  const isActive = checkboxValue(props.IsActive?.checkbox);

  // memberSlugs: stored as comma-separated text
  const memberSlugsRaw = richTextToPlain(props.memberSlugs?.rich_text);
  const memberSlugs = memberSlugsRaw
    ? memberSlugsRaw
        .split(",")
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0)
    : [];

  // Featured images
  let featuredImage: string | null = null;
  let featuredWideImage: string | null = null;

  const thumbUrl = filePropertyUrl(props.featuredImage?.files);
  if (thumbUrl) {
    try {
      featuredImage = await downloadNotionImage(
        thumbUrl,
        "projects",
        slug,
        "thumbnail",
        page.id,
        page.last_edited_time
      );
    } catch (err) {
      console.warn(`  Warning: Failed to download thumbnail for ${slug}:`, err);
    }
  }

  const wideUrl = filePropertyUrl(props.featuredWideImage?.files);
  if (wideUrl) {
    try {
      featuredWideImage = await downloadNotionImage(
        wideUrl,
        "projects",
        slug,
        "banner",
        page.id,
        page.last_edited_time
      );
    } catch (err) {
      console.warn(`  Warning: Failed to download banner for ${slug}:`, err);
    }
  }

  // Page body
  const body = await pageToMarkdown(page.id, "projects", slug);

  return {
    title,
    shortname,
    slug,
    date,
    memberSlugs,
    description,
    featuredImage,
    featuredWideImage,
    isActive,
    draft,
    body,
  };
}

function writeProjectFile(project: Project): void {
  const frontmatter = serializeProjectFrontmatter(project);
  const content = project.body
    ? `${frontmatter}\n${project.body}\n`
    : frontmatter;
  const filePath = path.join(CONTENT_DIR, `${project.slug}.md`);
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(filePath, content, "utf-8");
}

export async function syncProjects(): Promise<number> {
  console.log("Syncing projects...");

  if (!DB_IDS.projects) {
    console.error("Error: NOTION_PROJECTS_DB_ID is not set");
    return 0;
  }

  const dataSourceId = await getDataSourceId(DB_IDS.projects);
  let count = 0;
  let cursor: string | undefined = undefined;

  do {
    const response: QueryDataSourceResponse = await notion.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const page of response.results) {
      if (page.object !== "page" || !("properties" in page)) continue;
      try {
        const project = await processProjectPage(page as PageObjectResponse);
        writeProjectFile(project);
        count++;
        console.log(`  ✓ ${project.slug}`);
      } catch (err) {
        console.error(`  ✗ Error processing page ${page.id}:`, err);
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  console.log(`Projects sync complete: ${count} projects\n`);
  return count;
}
