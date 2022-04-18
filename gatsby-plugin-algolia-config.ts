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
              }
              frontmatter {
                title
                description
              }
              id
              slug
              rawBody
            }
          }
        }
      }
    `,
    transformer: ({ data }: { data: { allMdx: GatsbyTypes.Query['allMdx'] } }) =>
      data.allMdx.edges.map(({ node: { rawBody, fields, frontmatter, id, slug } }) => ({
        id,
        title: frontmatter?.title || '',
        category: fields?.category || '',
        description: frontmatter?.description || '',
        body: rawBody,
        path: slug,
      })),
  },
]

const airtableQueries = AIRTABLE_CONTENTS.map((item) => {
  return {
    query: `
      {
        allMdx(filter: { frontmatter: { title: {eq: "${item.pageTitle}" } } }) {
          edges {
            node {
              fields {
                category
              }
              frontmatter {
                title
                description
              }
              id
              slug
              rawBody
            }
          }
        }
        allAirtable(filter: { table: { eq: "${item.tableName}" } }) {
          edges {
            node {
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
              }
            }
          }
        }
      }
    `,
    transformer: ({ data }: { data: { allMdx: GatsbyTypes.Query['allMdx']; allAirtable: GatsbyTypes.Query['allAirtable'] } }) =>
      data.allMdx.edges.map(({ node: { rawBody, fields, frontmatter, id, slug } }) => ({
        id,
        title: frontmatter?.title || '',
        category: fields?.category || '',
        description: frontmatter?.description || '',
        body:
          rawBody +
          data.allAirtable.edges
            .map((edge) => {
              return Object.values(edge.node?.data || {})
                .filter((value) => {
                  return value !== null
                })
                .join(' ')
            })
            .join(' '),
        path: slug,
      })),
  }
})

export const algoliaConfig = {
  appId: process.env.GATSBY_ALGOLIA_APP_ID,
  apiKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
  indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  queries: [...mdxQueries, ...airtableQueries],
  skipIndexing: process.env.BRANCH !== 'main',
  continueOnFailure: false,
}
