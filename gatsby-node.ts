import path from 'path'
import type { CreateWebpackConfigArgs, GatsbyNode } from 'gatsby'

import * as gatsbyNode from './src/gatsby-node/index'

export const onCreateNode: GatsbyNode['onCreateNode'] = gatsbyNode.onCreateNode
export const createPages: GatsbyNode['createPages'] = gatsbyNode.createPages
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = gatsbyNode.createSchemaCustomization

export const onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        Components: path.resolve('src/components'),
      },
    },
  })
}
