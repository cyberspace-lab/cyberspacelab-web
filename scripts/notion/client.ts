import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.NOTION_API_KEY) {
  console.error("Error: NOTION_API_KEY is not set in .env");
  process.exit(1);
}

export const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const DB_IDS = {
  team: process.env.NOTION_TEAM_DB_ID || "",
  projects: process.env.NOTION_PROJECTS_DB_ID || "",
  publications: process.env.NOTION_PUBLICATIONS_DB_ID || "",
};

/**
 * Resolve a database ID to its data source ID.
 * In Notion API v5, databases.query was replaced by dataSources.query,
 * which requires the data source ID (not the database ID).
 */
const dataSourceCache = new Map<string, string>();

export async function getDataSourceId(databaseId: string): Promise<string> {
  const cached = dataSourceCache.get(databaseId);
  if (cached) return cached;

  const db = await notion.databases.retrieve({ database_id: databaseId }) as any;
  const dataSources = db.data_sources;
  if (!dataSources || dataSources.length === 0) {
    throw new Error(`Database ${databaseId} has no data sources`);
  }
  const dsId = dataSources[0].id;
  dataSourceCache.set(databaseId, dsId);
  return dsId;
}
