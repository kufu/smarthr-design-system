import { Actions, SourceNodesArgs } from 'gatsby'

import { fetchUiVersions } from './fetchUiVersions'

const NODE_TYPE = `UiVersion`

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }: SourceNodesArgs) => {
  const { createNode } = actions

  const data = await fetchUiVersions()

  data.forEach((item) =>
    createNode({
      version: item.version,
      commitHash: item.commitHash,
      uiProps: item.uiProps,
      uiStories: item.uiStories,
      id: createNodeId(`${NODE_TYPE}-${item.version}`),
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
      commitHash: String!
      version: String!
    }
  `)
}
