import path from 'path'

import dotenv from 'dotenv'
import emoji from 'remark-emoji'

import { algoliaConfig } from './gatsby-plugin-algolia-config'
import { AIRTABLE_CONTENTS } from './src/constants/airtable'

import type { GatsbyConfig } from 'gatsby'

dotenv.config({
  path: '.env',
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'SmartHR Design System',
    description: 'SmartHR Design Systemは、だれでも・効率よく・迷わずにSmartHRらしい表現をするためのデザインシステムです。',
    siteUrl: 'https://smarthr.design',
    author: '@smarthr',
    ogimage: '/images/ogp.png',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-HNCBKCD85V'],
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    ...(process.env.IS_TYPE_GEN ? ['gatsby-plugin-typegen'] : []),
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'SmartHR Design System',
        short_name: 'SmartHR DS',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#00C4CC',
        icon: 'src/images/touch-icon.png',
        include_favicon: false,
      },
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: algoliaConfig,
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: path.resolve(`content/articles`),
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx'],
        defaultLayouts: {
          defaults: path.resolve('src/templates/article.tsx'),
        },
        gatsbyRemarkPlugins: [
          { resolve: path.resolve(`src/plugins/gatsby-remark-index-id-header/index.js`) },
          {
            resolve: 'gatsby-remark-images',
            options: {
              quality: 90,
              maxWidth: 1024,
              disableBgImageOnAlpha: true,
              disableBgImage: false,
            },
          },
          {
            resolve: `gatsby-remark-image-attributes`,
            options: {
              dataAttributes: true,
            },
          },
        ],
        remarkPlugins: [emoji],
      },
    },
    {
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY, // may instead specify via env, see below
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: AIRTABLE_CONTENTS.map((item) => {
          return {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: item.tableName,
            tableView: `design system表示用`,
          }
        }),
      },
    },
  ],
}

export default config
