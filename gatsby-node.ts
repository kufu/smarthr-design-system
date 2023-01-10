import path from 'path'

import * as gatsbyNode from './src/gatsby-node'

import type { CreateWebpackConfigArgs, GatsbyNode } from 'gatsby'

export const onCreateNode: GatsbyNode['onCreateNode'] = gatsbyNode.onCreateNode
export const createPages: GatsbyNode['createPages'] = gatsbyNode.createPages
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = gatsbyNode.createSchemaCustomization

export const onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@Components': path.resolve('src/components'),
        '@Constants': path.resolve('src/constants'),
        '@Context': path.resolve('src/context'),
      },
    },
  })
  // Gatsbyではビルド時には常にNODE_ENV=productionになるため、ブランチで判定
  if (process.env.BRANCH === 'main') {
    actions.setWebpackConfig({
      devtool: false,
    })
  }
}
