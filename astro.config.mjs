// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import remarkEmoji from 'remark-emoji';
import remarkCodeBlock from './src/remark/remark-code-block';
import remarkIndexIdHeader from './src/remark/remark-index-id-header';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react()],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkIndexIdHeader, remarkCodeBlock, remarkEmoji],
  },
  vite: {
    css: {
      preprocessorOptions: {
        // media query での出し分けのための mixin をグローバルで使えるように
        scss: {
          additionalData: `@use "./src/styles/mixin.scss" as *;`,
        },
      },
    },
  },
});
