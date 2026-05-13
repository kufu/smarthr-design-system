import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

export const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  robotsNoIndex: z.boolean().default(false),
  ignoreH3Nav: z.boolean().default(false),
  order: z.number().optional(),
  deprecated: z.boolean().optional(),
  deprecatedMessage: z.string().optional(),
});

const articleCollection = defineCollection({
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/_*/**'], base: './src/content/articles' }),
  schema: articleSchema,
});

export const collections = {
  articles: articleCollection,
};
