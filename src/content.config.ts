import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

import { yamlGlob } from './lib/yamlGlobLoader';

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

export const checklistItemSchema = z.object({
  severity: z.enum(['must', 'should', 'avoid']),
  text: z.string(),
  source_section: z.string(),
  sub_items: z.array(z.string()).optional(),
  note: z.string().optional(),
});

const checklistCollection = defineCollection({
  loader: yamlGlob({
    pattern: '**/checklist.yaml',
    base: './src/content/articles/products/components',
  }),
  schema: z.object({
    items: z.array(checklistItemSchema),
  }),
});

export const collections = {
  articles: articleCollection,
  checklists: checklistCollection,
};
