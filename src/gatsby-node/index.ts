import path from 'path'

import { Actions, GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'
import packageInfo from 'smarthr-ui/package.json'

import { AIRTABLE_CONTENTS } from '../constants/airtable'
import { fetchPatternCode } from '../lib/fetchPatternCode'
import { fetchStoryData } from '../lib/fetchStoryData'

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
      storyName: string
      patternName: string
    }
    if (frontmatter && frontmatter.storyName) {
      const storyData = await fetchStoryData(frontmatter.storyName, packageInfo.version)
      createNodeField({
        name: 'storyData',
        node,
        value: storyData,
      })
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
            frontmatter {
              storyName
              patternName
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

    const targetAirtable = AIRTABLE_CONTENTS.filter((item: airtableContents) => {
      return item.pagePath === slug
    })

    if (slug) {
      createPage({
        path: slug || '',
        component,
        context: {
          id: node.id,
          category: node.fields?.category,
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

  createTypes(typeDefs)
}
