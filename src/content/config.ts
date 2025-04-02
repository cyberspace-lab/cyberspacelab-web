import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define the member collection schema
export const collections = {
  team: defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/content/team"}),
    schema: z.object({
      title: z.string(),
      order: z.number(),
      slug: z.string(),
      role: z.string(),
      education: z.array(z.string()),
      expertise: z.array(z.string()).optional(),
      hobbies: z.array(z.string()).optional(),
      favoriteGames: z.array(z.string()).optional(),
      projectSlugs: z.array(z.string()).optional(),
      featuredImage: z.string().optional(),
      description: z.string(),
      social: z.object({
        twitter: z.string().optional(),
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        web: z.string().optional(),
        linkedin: z.string().optional(),
        researchgate: z.string().optional()
      }).optional(),
    })
  }),
  projects: defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/content/projects"}),
    schema: z.object({
      title: z.string(),
      shortname: z.string(),
      draft: z.boolean(),
      slug: z.string(),
      date: z.string(),
      memberSlugs: z.array(z.string()),
      description: z.string(),
      featuredImage: z.string().optional(),
      featuredWideImage: z.string().optional(),
      isActive: z.boolean(),
    })
  }),
  publications: defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/content/publications"}),
    schema: z.object({
      title: z.string(),
      type: z.string(),
      slug: z.string(),
      date: z.string(),
      authors: z.string(),
      authorsSlug: z.array(z.string()).optional(),
      category: z.string(),
      journal: z.string(),
      url: z.string(),
      abstrakt: z.string().optional(),
    })
  })
}; 