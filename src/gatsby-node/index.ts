import path from 'path'

import { GatsbyNode, NodePluginArgs } from 'gatsby'
import { compileMDXWithCustomOptions } from 'gatsby-plugin-mdx'
import { createFilePath } from 'gatsby-source-filesystem'

import { AIRTABLE_CONTENTS } from '../constants/airtable'
import { fetchPatternCode } from '../lib/fetchPatternCode'
//@ts-ignore
import remarkHeadingsPlugin from '../plugins/gatsby-remark-headings'

import type { airtableContents } from '../constants/airtable'

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({ actions, node, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const fileName = createFilePath({ node, getNode }) // ex) /products/components/button/
    const fileNameArray = ((arr) => arr.slice(1, arr.length - 1))(fileName.split('/')) // ex) ['products', 'components', 'button']

    createNodeField({
      name: 'slug',
      node,
      value: fileName,
    })

    createNodeField({
      name: 'category',
      node,
      value: fileNameArray[0],
    })

    createNodeField({
      name: 'hierarchy',
      node,
      value: fileNameArray.join('/'),
    })

    const frontmatter = node.frontmatter as typeof node & {
      patternName: string
    }
    if (frontmatter && frontmatter.patternName) {
      const patternCode = await fetchPatternCode(frontmatter.patternName)
      createNodeField({
        name: 'patternCode',
        node,
        value: patternCode,
      })
    }
  }
}

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const result = await graphql<{
    allMdx: Queries.Query['allMdx']
  }>(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
              category
              hierarchy
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  const allMdx = result.data?.allMdx

  if (!allMdx) return

  allMdx.edges.forEach(({ node }) => {
    const slug = node.fields?.slug
    const component = path.resolve(`./src/templates/article.tsx`)

    const targetAirtable = AIRTABLE_CONTENTS.filter((item: airtableContents) => item.pagePath === slug)

    if (slug) {
      createPage({
        path: slug || '',
        component: `${component}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          id: node.id,
          category: node.fields?.category,
          airTableName: targetAirtable[0]?.tableName || '',
        },
      })
    }
  })
}

export const createSchemaCustomization = async ({
  getNode,
  getNodesByType,
  pathPrefix,
  reporter,
  cache,
  actions,
  schema,
  store,
}: NodePluginArgs) => {
  const { createTypes } = actions
  const headingsResolver = schema.buildObjectType({
    name: `Mdx`,
    fields: {
      headings: {
        type: `[MdxHeading]`,
        async resolve(mdxNode) {
          const fileNode = getNode(mdxNode.parent)
          if (!fileNode || typeof fileNode.absolutePath !== 'string') {
            return null
          }

          const result = await compileMDXWithCustomOptions(
            {
              source: mdxNode.body,
              absolutePath: fileNode.absolutePath,
            },
            {
              pluginOptions: { plugins: [] },
              customOptions: {
                mdxOptions: {
                  remarkPlugins: [remarkHeadingsPlugin],
                },
              },
              getNode,
              getNodesByType,
              pathPrefix,
              reporter,
              cache,
              store,
            },
          )

          if (!result) {
            return null
          }

          return result.metadata.headings
        },
      },
    },
  })

  const typeDefs = `
  type Mdx implements Node {
      fields: MdxFields
      frontmatter: MdxFrontmatter
    }
    type MdxFields {
      slug: String
      category: String
      hierarchy: String
      patternCode: String
    }
    type MdxFrontmatter {
      title: String!
      description: String!
      order: Int
      patternName: String
      ignoreH3Nav: Boolean
      robotsNoIndex: Boolean
    }
    type MdxHeading {
      value: String
      depth: Int
    }
  `

  createTypes([typeDefs, headingsResolver])
}
