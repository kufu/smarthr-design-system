// @ts-check
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import remarkEmoji from 'remark-emoji';

import remarkCodeBlock from './src/remark/remark-code-block';
import remarkIndexIdHeader from './src/remark/remark-index-id-header';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://smarthr.design',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  integrations: [react(), mdx(), tailwind(), sitemap()],
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      remarkPlugins: [remarkIndexIdHeader, remarkCodeBlock, remarkEmoji],
    }),
  },
  vite: {
    define: {
      process: 'globalThis.process',
    },
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: ['src'],
          // media query での出し分けのための mixin をグローバルで使えるように
          additionalData: `@use "styles/mixin.scss" as *;`,
        },
      },
    },
  },
});
