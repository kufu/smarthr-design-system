import { Actions, SourceNodesArgs } from 'gatsby'

import { fetchComponentCaptures } from './fetchComponentCaptures'

const NODE_TYPE = `ComponentCapture`

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }: SourceNodesArgs) => {
  const { createNode } = actions

  const data = await fetchComponentCaptures()

  data.forEach((item) =>
    createNode({
      groupName: item.groupName,
      captures: item.captures,
      id: createNodeId(`${NODE_TYPE}-${item.groupName}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        contentDigest: createContentDigest(item),
      },
    }),
  )

  return
}

exports.createSchemaCustomization = async ({ actions }: { actions: Actions }) => {
  const { createTypes } = actions

  createTypes(`
    type ${NODE_TYPE} implements Node {
      groupName: String!
      captures: [Capture!]!
    }
    type Capture {
      resourceKey: String
      displayName: String!
    }
  `)
}
