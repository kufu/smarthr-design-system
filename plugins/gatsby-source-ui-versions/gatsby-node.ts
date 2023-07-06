import { SourceNodesArgs } from 'gatsby'

import { fetchUiVersions } from './fetchUiVersions'

const NODE_TYPE = `UiVersion`

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }: SourceNodesArgs) => {
  const { createNode } = actions

  const data = await fetchUiVersions()

  // smarthr-uiの1バージョンを1ノードとして登録
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
