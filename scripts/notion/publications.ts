import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { notion, DB_IDS, getDataSourceId } from "./client.js";
import { serializePublicationFrontmatter } from "./frontmatter.js";
import {
  pageToMarkdown,
  richTextToPlain,
  multiSelectToArray,
  selectToString,
} from "./markdown.js";
import type { Publication } from "./types.js";
import type {
  PageObjectResponse,
  QueryDataSourceResponse,
} from "@notionhq/client/build/src/api-endpoints.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, "../../src/content/publications");

async function processPublicationPage(
  page: PageObjectResponse
): Promise<Publication> {
  const props = page.properties as any;
  const slug = richTextToPlain(props.slug?.rich_text);

  if (!slug) {
    throw new Error(`Publication page ${page.id} has no slug`);
  }

  console.log(`  Processing publication: ${slug}`);

  const title = richTextToPlain(props.title?.title);
  const type = selectToString(props.type?.select);
  const date = richTextToPlain(props.date?.rich_text);
  const authors = richTextToPlain(props.authors?.rich_text);
  const authorsSlug = multiSelectToArray(props.authorsSlug?.multi_select);
  const category = selectToString(props.category?.select);
  const journal = richTextToPlain(props.journal?.rich_text);

  // URL property — Notion stores it differently from rich_text
  // The property name in Notion is "url" but internally it may be "userDefined:url"
  const url = props.url?.url || props["userDefined:url"]?.url || "";

  const abstrakt = richTextToPlain(props.abstrakt?.rich_text) || null;

  // Most publications have no body content
  let body = "";
  try {
    body = await pageToMarkdown(page.id, "publications", slug);
  } catch {
    // ignore — most publications have empty body
  }

  return {
    title,
    type,
    slug,
    date,
    authors,
    authorsSlug,
    category,
    journal,
    url,
    abstrakt,
    body,
  };
}

function writePublicationFile(pub: Publication): void {
  const frontmatter = serializePublicationFrontmatter(pub);
  const content = pub.body ? `${frontmatter}\n${pub.body}\n` : frontmatter;
  const filePath = path.join(CONTENT_DIR, `${pub.slug}.md`);
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(filePath, content, "utf-8");
}

export async function syncPublications(): Promise<number> {
  console.log("Syncing publications...");

  if (!DB_IDS.publications) {
    console.error("Error: NOTION_PUBLICATIONS_DB_ID is not set");
    return 0;
  }

  const dataSourceId = await getDataSourceId(DB_IDS.publications);
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
        const pub = await processPublicationPage(page as PageObjectResponse);
        writePublicationFile(pub);
        count++;
        console.log(`  ✓ ${pub.slug}`);
      } catch (err) {
        console.error(`  ✗ Error processing page ${page.id}:`, err);
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  console.log(`Publications sync complete: ${count} publications\n`);
  return count;
}
