import { defineCollection, z } from 'astro:content';
import { glob } from "astro/loaders";

export const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  robotsNoIndex: z.boolean().default(false),
  ignoreH3Nav: z.boolean().default(false),
  order: z.number().optional(),
});

const articleCollection = defineCollection({
  loader: glob({ pattern: ["**/*.mdx", "!**/_components/*.mdx"], base: "./src/content/articles" }),
  schema: articleSchema,
});

export const collections = {
  articles: articleCollection,
};
