import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { notion, DB_IDS, getDataSourceId } from "./client.js";
import { serializeTeamFrontmatter } from "./frontmatter.js";
import { downloadNotionImage, resetPublicDir } from "./images.js";
import {
  pageToMarkdown,
  richTextToPlain,
  richTextToArray,
  multiSelectToArray,
  selectToString,
  filePropertyUrl,
} from "./markdown.js";
import type { TeamMember } from "./types.js";
import type {
  PageObjectResponse,
  QueryDataSourceResponse,
} from "@notionhq/client/build/src/api-endpoints.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, "../../src/content/team");

async function processTeamPage(page: PageObjectResponse): Promise<TeamMember> {
  const props = page.properties as any;
  const slug = richTextToPlain(props.slug?.rich_text);

  if (!slug) {
    throw new Error(`Team page ${page.id} has no slug`);
  }

  console.log(`  Processing team member: ${slug}`);

  // Extract properties
  const title = richTextToPlain(props.title?.title);
  const role = selectToString(props.role?.select);
  const level = selectToString(props.level?.select);
  const education = richTextToArray(props.education?.rich_text);
  const hobbies = richTextToArray(props.hobbies?.rich_text);
  const expertise = multiSelectToArray(props.expertise?.multi_select);
  const favoriteGames = multiSelectToArray(props.favoriteGames?.multi_select);
  const projectSlugs = multiSelectToArray(props.projectSlugs?.multi_select);

  // Social links
  const social: TeamMember["social"] = {};
  if (props.social_twitter?.url) social.twitter = props.social_twitter.url;
  if (props.social_facebook?.url) social.facebook = props.social_facebook.url;
  if (props.social_instagram?.url)
    social.instagram = props.social_instagram.url;
  if (props.social_web?.url) social.web = props.social_web.url;
  if (props.social_linkedin?.url) social.linkedin = props.social_linkedin.url;
  if (props.social_researchgate?.url)
    social.researchgate = props.social_researchgate.url;

  // Featured image
  let featuredImage: string | null = null;
  const imageUrl = filePropertyUrl(props.featuredImage?.files);
  if (imageUrl) {
    try {
      featuredImage = await downloadNotionImage(imageUrl, "team", slug, slug);
    } catch (err) {
      console.warn(`  Warning: Failed to download image for ${slug}:`, err);
    }
  }

  // Page body content
  const body = await pageToMarkdown(page.id, "team", slug);

  return {
    title,
    slug,
    role,
    level,
    education,
    expertise,
    hobbies,
    favoriteGames,
    projectSlugs,
    featuredImage,
    social,
    body,
  };
}

function writeTeamFile(member: TeamMember): void {
  const frontmatter = serializeTeamFrontmatter(member);
  const content = member.body ? `${frontmatter}\n${member.body}\n` : frontmatter;
  const filePath = path.join(CONTENT_DIR, `${member.slug}.md`);
  fs.writeFileSync(filePath, content, "utf-8");
}

/** Delete every markdown file in the team content dir. */
function clearMarkdownFiles(): void {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  for (const f of fs.readdirSync(CONTENT_DIR)) {
    if (f.endsWith(".md")) fs.rmSync(path.join(CONTENT_DIR, f));
  }
}

export async function syncTeam(): Promise<number> {
  console.log("Syncing team members...");

  if (!DB_IDS.team) {
    console.error("Error: NOTION_TEAM_DB_ID is not set");
    return 0;
  }

  // Resolving the data source is a live Notion call — if auth/connectivity is
  // broken it throws here, before we delete anything.
  const dataSourceId = await getDataSourceId(DB_IDS.team);

  // Purge previously-synced team images so renamed/removed members leave no
  // orphans. Every image is re-downloaded fresh below.
  resetPublicDir("assets/images/team");
  resetPublicDir("content/team");

  // Fetch + process every page first. A query failure mid-pagination throws
  // and aborts before any markdown is touched, so we never rewrite from a
  // partial fetch.
  const members: TeamMember[] = [];
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
        const member = await processTeamPage(page as PageObjectResponse);
        members.push(member);
        console.log(`  ✓ ${member.slug}`);
      } catch (err) {
        skipped++;
        console.error(`  ✗ Error processing page ${page.id}:`, err);
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  // All pages fetched — replace the markdown set wholesale.
  clearMarkdownFiles();
  for (const member of members) writeTeamFile(member);

  if (skipped > 0) {
    console.warn(
      `  ⚠ ${skipped} team page(s) skipped due to errors — review the git diff before committing, as their markdown was removed.`
    );
  }
  console.log(`Team sync complete: ${members.length} members\n`);
  return members.length;
}
