import { defineCollection, z } from 'astro:content';

export const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  robotsNoIndex: z.boolean().default(false),
  order: z.number().optional(),
  patternName: z.string().optional(),
});

const articleCollection = defineCollection({
  type: 'content',
  schema: articleSchema,
});

export const collections = {
  articles: articleCollection,
};
