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
      education: z.array(z.string()),
      expertise: z.array(z.string()).optional(),
      hobbies: z.array(z.string()),
      favoriteGames: z.array(z.string()),
      projectSlugs: z.array(z.string()),
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
  })
}; 