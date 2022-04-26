'use strict'

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
  },
})

require('./src/__generated__/gatsby-types')

const { onCreateNode, createPages, createSchemaCustomization } = require('./src/gatsby-node/index')
const path = require('path')

exports.onCreateNode = onCreateNode
exports.createPages = createPages
exports.createSchemaCustomization = createSchemaCustomization

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        Components: path.resolve(__dirname, 'src/components'),
      },
    },
  })
}
