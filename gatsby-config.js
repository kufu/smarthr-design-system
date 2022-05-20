require('dotenv').config({
  path: '.env',
})

module.exports = {
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
    'gatsby-plugin-react-helmet',
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
        icon: 'src/images/favicon.svg',
      },
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: require('./gatsby-plugin-algolia-config.js'),
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: `${__dirname}/content/articles`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx'],
        defaultLayouts: {
          defaults: require.resolve('./src/templates/article.tsx'),
        },
        gatsbyRemarkPlugins: [
          { resolve: require.resolve(`./src/plugins/gatsby-remark-index-id-header/index.js`) },
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
        remarkPlugins: [require('remark-emoji')],
      },
    },
    {
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY, // may instead specify via env, see below
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `用字用語：一覧`,
            tableView: `design system表示用`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `用字用語：理由`,
            tableView: `design system表示用`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `基本的な考え方や表記`,
            tableView: `design system表示用`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `UIテキスト`,
            tableView: `design system表示用`,
          },
        ],
      },
    },
  ],
}
