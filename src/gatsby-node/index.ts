import path from 'path'
import { Actions, GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'

import { AIRTABLE_CONTENTS } from '../constants/airtable'
import type { airtableContents } from '../constants/airtable'

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ actions, node, getNode }) => {
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
  }
}

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const result = await graphql<{
    allMdx: GatsbyTypes.Query['allMdx']
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
    const fileNameArray = node.fields?.hierarchy?.split('/') ?? ''
    const depth1Glob = `${fileNameArray[0]}`
    const depth2Glob = `${fileNameArray[0]}/*`
    const depth3Glob = `${fileNameArray[0]}/${fileNameArray[1]}/*`
    const depth4Glob = `${fileNameArray[0]}/${fileNameArray[1]}/${fileNameArray[2]}/*`

    const targetAirtable = AIRTABLE_CONTENTS.filter((item: airtableContents) => {
      return item.pagePath === slug
    })

    if (slug) {
      createPage({
        path: slug || '',
        component: component,
        context: {
          id: node.id,
          category: node.fields?.category,
          depth1Glob,
          depth2Glob,
          depth3Glob,
          depth4Glob,
          airTableName: targetAirtable[0]?.tableName || '',
        },
      })
    }
  })
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({ actions }: { actions: Actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      title: String!
      description: String!
      order: Int
    }
  `
  // MdxFrontmatterには`smarthr-ui`もあるが、型定義（`smarthr_ui: String`）を追加すると値が取得できない現象が起こるため、未定義。

  createTypes(typeDefs)
}
