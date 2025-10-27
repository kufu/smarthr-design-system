// @ts-check
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import remarkEmoji from 'remark-emoji';

import remarkCodeBlock from './src/remark/remark-code-block';
import remarkIndexIdHeader from './src/remark/remark-index-id-header';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
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
    ssr: {
      external: [
        'child_process',
        'crypto',
        'fs',
        'fs/promises',
        'http',
        'https',
        'node:buffer',
        'node:crypto',
        'node:fs',
        'node:http2',
        'node:module',
        'node:path',
        'node:process',
        'node:url',
        'os',
        'path',
        'tty',
        'url',
        'worker_threads',
      ],
    },
  },
});
