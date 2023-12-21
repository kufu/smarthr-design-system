import dotenv from 'dotenv'
dotenv.config({
  path: '.env',
})

import { AIRTABLE_CONTENTS } from './src/constants/airtable'

const mdxQueries = [
  {
    query: `
      {
        allMdx {
          edges {
            node {
              fields {
                category
                slug
              }
              frontmatter {
                title
                description
              }
              id
              body
              internal {
                contentDigest
              }
            }
          }
        }
      }
    `,
    transformer: ({ data }: { data: { allMdx: Queries.Query['allMdx'] } }) =>
      data.allMdx.edges.map(({ node: { body, fields, frontmatter, id, internal } }) => ({
        id,
        internal,
        title: frontmatter?.title || '',
        category: fields?.category || '',
        description: frontmatter?.description || '',
        body,
        path: fields?.slug || '',
      })),
  },
]

const airtableQueries = AIRTABLE_CONTENTS.map((item) => ({
  query: `
      {
        allMdx(filter: { frontmatter: { title: {eq: "${item.pageTitle}" } } }) {
          edges {
            node {
              fields {
                category
                slug
              }
              frontmatter {
                title
                description
              }
              id
              body
              internal {
                contentDigest
              }
            }
          }
        }
        allSdsAirtable(filter: { table: { eq: "${item.tableName}" } }) {
          edges {
            node {
              id
              internal {
                contentDigest
              }
              data {
                name
                description
                discussion
                source
                label
                ng_example
                ok_example
                expected
                reason
                record_id
                order
              }
            }
          }
        }
      }
    `,
  transformer: ({ data }: { data: { allMdx: Queries.Query['allMdx']; allSdsAirtable: Queries.Query['allSdsAirtable'] } }) =>
    data.allMdx.edges.map(({ node: { body, fields, frontmatter, id, internal } }) => ({
      id,
      internal,
      title: frontmatter?.title || '',
      category: fields?.category || '',
      description: frontmatter?.description || '',
      body:
        body +
        data.allSdsAirtable.edges
          .map((edge) =>
            Object.values(edge.node?.data || {})
              .filter((value) => value !== null)
              .join(' '),
          )
          .join(' '),
      path: fields?.slug || '',
    })),
}))

export const algoliaConfig = {
  appId: process.env.GATSBY_ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_ADMIN_API_KEY,
  indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  queries: [...mdxQueries, ...airtableQueries],
  dryRun: process.env.BRANCH !== 'main',
  continueOnFailure: process.env.BRANCH !== 'main',
}
