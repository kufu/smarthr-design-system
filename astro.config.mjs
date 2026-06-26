// @ts-check
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import remarkEmoji from 'remark-emoji';
import { unified } from '@astrojs/markdown-remark';

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
  integrations: [
    react(),
    mdx(),
    partytown({
      config: {
        // https://partytown.builder.io/google-tag-manager#google-analytics-4-ga4
        forward: ['dataLayer.push'],
      },
    }),
    tailwind(),
    sitemap(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkIndexIdHeader, remarkCodeBlock, remarkEmoji],
    }),
    syntaxHighlight: false,
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
