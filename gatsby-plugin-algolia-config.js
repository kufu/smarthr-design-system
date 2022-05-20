// TODO: Gatsbyをバージョンアップしたらこのgatsby-config.jsをTS化し、AIRTABLE_CONTENTSの内容はここに書かず ../src/constants から読み込む
// https://github.com/kufu/smarthr-design-system/issues/807
const AIRTABLE_CONTENTS = [
  {
    pageTitle: 'ライティングスタイル',
    tableName: '基本的な考え方や表記',
  },
  {
    pageTitle: 'UIテキスト',
    tableName: 'UIテキスト',
  },
  {
    pageTitle: '用字用語：一覧',
    tableName: '用字用語：一覧',
  },
  {
    pageTitle: '用字用語：理由',
    tableName: '用字用語：理由',
  },
]

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
    transformer: ({ data }) =>
      data.allMdx.edges.map(
        ({
          node: {
            rawBody,
            fields: { category },
            frontmatter: { title, description },
            id,
            slug,
          },
        }) => ({
          id,
          title,
          category,
          description,
          body: rawBody,
          path: slug,
        }),
      ),
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
                heading
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
    transformer: ({ data }) =>
      data.allMdx.edges.map(
        ({
          node: {
            rawBody,
            fields: { category },
            frontmatter: { title, description },
            id,
            slug,
          },
        }) => ({
          id,
          title,
          category,
          description,
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
        }),
      ),
  }
})

module.exports = {
  appId: process.env.GATSBY_ALGOLIA_APP_ID,
  apiKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
  indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  queries: [...mdxQueries, ...airtableQueries],
  skipIndexing: process.env.BRANCH !== 'main',
  continueOnFailure: false,
}
