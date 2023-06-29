import { Actions, SourceNodesArgs } from 'gatsby'

import { fetchComponentCaptures } from './fetchComponentCaptures'

const NODE_TYPE = `ComponentCapture`

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }: SourceNodesArgs) => {
  const { createNode } = actions

  const data = await fetchComponentCaptures()

  data.forEach((item) =>
    createNode({
      groupName: item.groupName,
      storyKinds: item.storyKinds,
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
      storyKinds: [StoryKind!]!
    }
    type StoryKind {
      kindName: String!
      iframeUrl: String!
      thumbnailFileName: String!
      displayName: String!
      componentPath: String!
      numberOfStories: Int!
    }
  `)
}
