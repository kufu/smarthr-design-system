// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

import remarkCodeBlock from './src/remark/remark-code-block';
import remarkIndexIdHeader from './src/remark/remark-index-id-header';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react()],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkIndexIdHeader, remarkCodeBlock],
  },
});
