import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "../..");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const MANIFEST_PATH = path.join(ROOT_DIR, "scripts", ".sync-manifest.json");

const MAX_WIDTH = 1600;
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
const WEBP_QUALITY = 80;

interface ManifestEntry {
  notionPageId: string;
  localPath: string;
  lastEdited: string;
  optimized?: boolean;
  hash?: string;
}

interface Manifest {
  images: Record<string, ManifestEntry>;
}

let manifest: Manifest | null = null;

function loadManifest(): Manifest {
  if (manifest) return manifest;
  try {
    const raw = fs.readFileSync(MANIFEST_PATH, "utf-8");
    manifest = JSON.parse(raw);
    return manifest!;
  } catch {
    manifest = { images: {} };
    return manifest;
  }
}

export function saveManifest(): void {
  const m = loadManifest();
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(m, null, 2));
}

/**
 * Download a file from a URL to a local path.
 * Returns the local path relative to /public (for use in frontmatter).
 */
function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath);
    fs.mkdirSync(dir, { recursive: true });

    const client = url.startsWith("https") ? https : http;
    client
      .get(url, { headers: { "User-Agent": "CyberspaceLab-Sync/1.0" } }, (res) => {
        // Follow redirects
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Download failed: ${res.statusCode} for ${url}`));
          return;
        }
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
        file.on("error", reject);
      })
      .on("error", reject);
  });
}

/**
 * Guess file extension from a Notion file URL.
 */
function getExtensionFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).toLowerCase();
    if (ext && [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif"].includes(ext)) {
      return ext;
    }
  } catch {
    // ignore
  }
  return ".jpg"; // fallback
}

/**
 * Optimize an image in-place using sharp.
 * Resizes if wider than MAX_WIDTH and compresses based on format.
 */
async function optimizeImage(filePath: string): Promise<void> {
  const ext = path.extname(filePath).toLowerCase();
  if ([".svg", ".gif"].includes(ext)) return;

  const buffer = fs.readFileSync(filePath);
  const meta = await sharp(buffer).metadata();

  let pipeline = sharp(buffer);
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH);
  }

  // sharp can't overwrite input directly, write to temp then rename
  const tmpPath = filePath + ".tmp";

  if ([".jpg", ".jpeg"].includes(ext)) {
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmpPath);
  } else if (ext === ".png") {
    await pipeline.png({ quality: PNG_QUALITY }).toFile(tmpPath);
  } else if (ext === ".webp") {
    await pipeline.webp({ quality: WEBP_QUALITY }).toFile(tmpPath);
  } else if (ext === ".avif") {
    await pipeline.avif({ quality: WEBP_QUALITY }).toFile(tmpPath);
  } else {
    // Unknown raster format — just resize if needed
    await pipeline.toFile(tmpPath);
  }

  const originalSize = buffer.length;
  const optimizedSize = fs.statSync(tmpPath).size;
  fs.renameSync(tmpPath, filePath);

  const saved = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
  console.log(`    Optimized: ${(originalSize / 1024).toFixed(0)}KB → ${(optimizedSize / 1024).toFixed(0)}KB (${saved}% smaller)`);
}

/**
 * Download a Notion image and save to the public assets directory.
 * Returns the path to use in frontmatter (relative to site root).
 */
export async function downloadNotionImage(
  url: string,
  category: string,
  slug: string,
  filename: string,
  pageId: string,
  lastEdited: string
): Promise<string> {
  const m = loadManifest();
  const key = `${category}/${slug}/${filename}`;

  const ext = getExtensionFromUrl(url);
  const localFilename = filename.includes(".") ? filename : `${filename}${ext}`;

  let localPath: string;
  if (category === "team") {
    localPath = `/assets/images/team/${localFilename}`;
  } else if (category === "projects") {
    localPath = `/assets/images/projects/${slug}/${localFilename}`;
  } else {
    localPath = `/assets/images/${category}/${slug}/${localFilename}`;
  }

  const fullPath = path.join(PUBLIC_DIR, localPath);

  // Check manifest for cached version
  const existing = m.images[key];
  if (existing && existing.lastEdited === lastEdited && fs.existsSync(fullPath)) {
    // File is cached but may not be optimized yet
    if (!existing.optimized) {
      console.log(`  Optimizing existing image: ${localPath}`);
      await optimizeImage(fullPath);
      existing.optimized = true;
    }
    return existing.localPath;
  }

  console.log(`  Downloading image: ${localPath}`);
  await downloadFile(url, fullPath);
  await optimizeImage(fullPath);

  // Update manifest
  m.images[key] = {
    notionPageId: pageId,
    localPath,
    lastEdited,
    optimized: true,
  };

  return localPath;
}

/**
 * Download an inline image from Notion page body.
 * Returns the local path for markdown reference.
 */
export async function downloadInlineImage(
  url: string,
  category: string,
  slug: string,
  imageName: string,
  pageId: string
): Promise<string> {
  const ext = getExtensionFromUrl(url);
  const filename = imageName.includes(".") ? imageName : `${imageName}${ext}`;

  let localPath: string;
  if (category === "projects") {
    localPath = `/content/projects/${slug}/${filename}`;
  } else {
    localPath = `/content/${category}/${slug}/${filename}`;
  }

  const fullPath = path.join(PUBLIC_DIR, localPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  console.log(`  Downloading inline image: ${localPath}`);
  await downloadFile(url, fullPath);
  await optimizeImage(fullPath);

  return localPath;
}
