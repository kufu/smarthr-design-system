import path from 'path'

import dotenv from 'dotenv'
import emoji from 'remark-emoji'

import { algoliaConfig } from './gatsby-plugin-algolia-config'
import { AIRTABLE_MOCK_DATA } from './src/constants/airtable'

import type { GatsbyConfig } from 'gatsby'

dotenv.config({
  path: '.env',
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'SmartHR Design System',
    description: 'SmartHR Design Systemは、だれでも・効率よく・迷わずにSmartHRらしい表現をするためのデザインシステムです。',
    siteUrl: 'https://smarthr.design',
    author: '@SHRDesignSystem',
    ogimage: '/images/ogp.png',
  },
  graphqlTypegen: true,
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
          'gatsby-remark-gifs',
        ],
        remarkPlugins: [emoji],
      },
    },
    // AIRTABLEキーが設定されているか、本番環境の場合はgatsby-source-airtable、それ以外ではモックデータを利用する
    ...((process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN && process.env.AIRTABLE_BASE_ID) || process.env.BRANCH === 'main'
      ? [
          {
            resolve: `gatsby-source-sds-airtable`,
            options: {
              personalAccessToken: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
              baseId: process.env.AIRTABLE_BASE_ID,
              tableView: 'design system表示用',
            },
          },
        ]
      : [
          {
            resolve: `gatsby-source-mock`,
            options: {
              schema: AIRTABLE_MOCK_DATA,
              count: AIRTABLE_MOCK_DATA.length,
              type: 'SdsAirtable',
            },
          },
        ]),
    {
      resolve: `gatsby-source-ui-versions`,
      options: {
        uiRepoApi: 'https://api.github.com/repos/kufu/smarthr-ui',
        releaseBotEmail: '41898282+github-actions[bot]@users.noreply.github.com',
        chromaticDomain: '63d0ccabb5d2dd29825524ab.chromatic.com',
        fetchLimit: 100,
      },
    },
    { resolve: `gatsby-source-component-captures` },
  ],
}

export default config
