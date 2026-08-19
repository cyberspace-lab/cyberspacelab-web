import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { notion, DB_IDS, getDataSourceId } from "./client.js";
import { serializeProjectFrontmatter } from "./frontmatter.js";
import { downloadNotionImage, resetPublicDir } from "./images.js";
import {
  pageToMarkdown,
  richTextToPlain,
  multiSelectToArray,
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

  const memberSlugs = multiSelectToArray(props.memberSlugs?.multi_select);

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
        "thumbnail"
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
        "banner"
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
  fs.writeFileSync(filePath, content, "utf-8");
}

/** Delete every markdown file in the projects content dir. */
function clearMarkdownFiles(): void {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  for (const f of fs.readdirSync(CONTENT_DIR)) {
    if (f.endsWith(".md")) fs.rmSync(path.join(CONTENT_DIR, f));
  }
}

export async function syncProjects(): Promise<number> {
  console.log("Syncing projects...");

  if (!DB_IDS.projects) {
    console.error("Error: NOTION_PROJECTS_DB_ID is not set");
    return 0;
  }

  // Live Notion call — throws before any deletion if auth/connectivity fails.
  const dataSourceId = await getDataSourceId(DB_IDS.projects);

  // Purge previously-synced project images/inline assets so renamed/removed
  // projects leave no orphans. Everything is re-downloaded fresh below.
  resetPublicDir("assets/images/projects");
  resetPublicDir("content/projects");

  // Fetch + process every page first; a query failure aborts before markdown
  // is touched, so we never rewrite from a partial fetch.
  const projects: Project[] = [];
  let skipped = 0;
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
        projects.push(project);
        console.log(`  ✓ ${project.slug}`);
      } catch (err) {
        skipped++;
        console.error(`  ✗ Error processing page ${page.id}:`, err);
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  // All pages fetched — replace the markdown set wholesale.
  clearMarkdownFiles();
  for (const project of projects) writeProjectFile(project);

  if (skipped > 0) {
    console.warn(
      `  ⚠ ${skipped} project page(s) skipped due to errors — review the git diff before committing, as their markdown was removed.`
    );
  }
  console.log(`Projects sync complete: ${projects.length} projects\n`);
  return projects.length;
}
