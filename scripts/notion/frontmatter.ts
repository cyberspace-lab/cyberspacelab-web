/**
 * YAML frontmatter serialization utilities.
 * Uses manual formatting to match the existing markdown files' style.
 */

/** Quote a YAML string value if it contains special characters */
function yamlString(value: string): string {
  if (
    value.includes(":") ||
    value.includes("#") ||
    value.includes('"') ||
    value.includes("'") ||
    value.includes("\n") ||
    value.startsWith(" ") ||
    value.startsWith("{") ||
    value.startsWith("[") ||
    value.startsWith("*") ||
    value.startsWith("&") ||
    value.startsWith("!") ||
    value.startsWith("%") ||
    value.startsWith("@") ||
    value.startsWith("`") ||
    /^(true|false|yes|no|null|~)$/i.test(value)
  ) {
    // Use double quotes, escaping internal double quotes
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}

/** Serialize a string array to inline YAML format: ["a", "b", "c"] */
function yamlStringArray(arr: string[]): string {
  if (arr.length === 0) return "[]";
  const items = arr.map((s) => `"${s.replace(/"/g, '\\"')}"`);
  return `[${items.join(", ")}]`;
}

/** Serialize a YAML block scalar for long text (using >) */
function yamlBlockScalar(text: string): string {
  return `>\n  ${text.replace(/\n/g, "\n  ")}`;
}

export function serializeTeamFrontmatter(data: {
  title: string;
  order: number;
  slug: string;
  role: string;
  description: string;
  education: string[];
  expertise: string[];
  hobbies: string[];
  favoriteGames: string[];
  projectSlugs: string[];
  featuredImage: string | null;
  social: Record<string, string | undefined>;
}): string {
  let fm = "---\n";
  fm += `title: ${yamlString(data.title)}\n`;
  fm += `order: ${data.order}\n`;
  fm += `slug: "${data.slug}"\n`;
  fm += `role: ${data.role}\n`;
  fm += `description: ${yamlString(data.description)}\n`;
  fm += `education: ${yamlStringArray(data.education)}\n`;
  if (data.expertise.length > 0) {
    fm += `expertise: ${yamlStringArray(data.expertise)}\n`;
  }
  if (data.favoriteGames.length > 0) {
    fm += `favoriteGames: ${yamlStringArray(data.favoriteGames)}\n`;
  }
  if (data.projectSlugs.length > 0) {
    fm += `projectSlugs: ${yamlStringArray(data.projectSlugs)}\n`;
  }
  if (data.featuredImage) {
    fm += `featuredImage: ${data.featuredImage}\n`;
  }
  if (data.hobbies.length > 0) {
    fm += `hobbies: ${yamlStringArray(data.hobbies)}\n`;
  }
  // Social links
  const socialEntries = Object.entries(data.social).filter(
    ([, v]) => v != null && v !== ""
  );
  if (socialEntries.length > 0) {
    fm += "social:\n";
    for (const [key, value] of socialEntries) {
      fm += `  ${key}: ${value}\n`;
    }
  }
  fm += "---\n";
  return fm;
}

export function serializeProjectFrontmatter(data: {
  title: string;
  shortname: string;
  slug: string;
  date: string;
  memberSlugs: string[];
  description: string;
  featuredImage: string | null;
  featuredWideImage: string | null;
  isActive: boolean;
  draft: boolean;
}): string {
  let fm = "---\n";
  fm += `title: ${yamlString(data.title)}\n`;
  fm += `shortname: ${yamlString(data.shortname)}\n`;
  fm += `slug: ${data.slug}\n`;
  fm += `date: ${data.date}\n`;
  fm += `memberSlugs: ${yamlStringArray(data.memberSlugs)}\n`;
  fm += `description: ${yamlString(data.description)}\n`;
  if (data.featuredImage) {
    fm += `featuredImage: ${data.featuredImage}\n`;
  }
  if (data.featuredWideImage) {
    fm += `featuredWideImage: ${data.featuredWideImage}\n`;
  }
  fm += `isActive: ${data.isActive}\n`;
  fm += `draft: ${data.draft}\n`;
  fm += "---\n";
  return fm;
}

export function serializePublicationFrontmatter(data: {
  title: string;
  type: string;
  slug: string;
  date: string;
  authors: string;
  authorsSlug: string[];
  category: string;
  journal: string;
  url: string;
  abstrakt: string | null;
}): string {
  let fm = "---\n";
  fm += `title: ${yamlString(data.title)}\n`;
  fm += `type: ${yamlString(data.type)}\n`;
  fm += `slug: ${data.slug}\n`;
  fm += `date: ${data.date}\n`;
  fm += `authors: ${yamlString(data.authors)}\n`;
  if (data.authorsSlug.length > 0) {
    fm += `authorsSlug: ${yamlStringArray(data.authorsSlug)}\n`;
  }
  fm += `category: ${yamlString(data.category)}\n`;
  fm += `journal: ${yamlString(data.journal)}\n`;
  fm += `url: ${data.url}\n`;
  if (data.abstrakt) {
    fm += `abstrakt: ${yamlBlockScalar(data.abstrakt)}\n`;
  }
  fm += "---\n";
  return fm;
}
