#!/usr/bin/env tsx
/**
 * Notion → Markdown sync script for CyberspaceLab website.
 *
 * Usage:
 *   npx tsx scripts/sync-notion.ts                    # Sync all collections
 *   npx tsx scripts/sync-notion.ts --collection team  # Sync only team
 *   npx tsx scripts/sync-notion.ts --collection projects
 *   npx tsx scripts/sync-notion.ts --collection publications
 */

import { syncTeam } from "./notion/team.js";
import { syncProjects } from "./notion/projects.js";
import { syncPublications } from "./notion/publications.js";
import { saveManifest } from "./notion/images.js";

const args = process.argv.slice(2);
const collectionIndex = args.indexOf("--collection");
const collection =
  collectionIndex >= 0 ? args[collectionIndex + 1] : undefined;

async function main() {
  console.log("=== Notion Sync ===\n");

  const validCollections = ["team", "projects", "publications"];
  if (collection && !validCollections.includes(collection)) {
    console.error(
      `Unknown collection: ${collection}. Valid: ${validCollections.join(", ")}`
    );
    process.exit(1);
  }

  let totalSynced = 0;

  try {
    if (!collection || collection === "team") {
      totalSynced += await syncTeam();
    }
    if (!collection || collection === "projects") {
      totalSynced += await syncProjects();
    }
    if (!collection || collection === "publications") {
      totalSynced += await syncPublications();
    }

    // Save the image download manifest
    saveManifest();

    console.log(`=== Done: ${totalSynced} items synced ===`);
  } catch (err) {
    console.error("Sync failed:", err);
    process.exit(1);
  }
}

main();
