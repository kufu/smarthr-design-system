// @ts-check
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import remarkEmoji from 'remark-emoji';

import remarkCodeBlock from './src/remark/remark-code-block';
import remarkIndexIdHeader from './src/remark/remark-index-id-header';

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  integrations: [
    mdx(),
    react(),
    partytown({
      config: {
        // https://partytown.builder.io/google-tag-manager#google-analytics-4-ga4
        forward: ['dataLayer.push'],
      },
    }),
    tailwind(),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkIndexIdHeader, remarkCodeBlock, remarkEmoji],
  },
  vite: {
    define: {
      process: 'globalThis.process',
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Deprecation [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
          // を出ないようにするために sass-embedded を指定
          // 参考: https://retrorocket.biz/archives/fix-scss-deprecate-with-astro-v4
          api: 'modern-compiler',
          // media query での出し分けのための mixin をグローバルで使えるように
          additionalData: `@use "./src/styles/mixin.scss" as *;`,
        },
      },
    },
  },
});
