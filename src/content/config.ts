import { defineCollection, z } from 'astro:content';

export const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number(),
  robotsNoIndex: z.boolean().default(false),
});

const articleCollection = defineCollection({
  type: 'content',
  schema: articleSchema,
});

export const collenctions = {
  articles: articleCollection,
};
