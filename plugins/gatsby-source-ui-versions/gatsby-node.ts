import { SourceNodesArgs } from 'gatsby'

import { fetchUiVersions } from './fetchUiVersions'

import type { UiVersion } from './fetchUiVersions'

const NODE_TYPE = `UiVersion`

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId, cache }: SourceNodesArgs) => {
  const { createNode } = actions

  const cachedData: UiVersion[] = await cache.get('uiVersionsCache')
  const data = await fetchUiVersions(cachedData)
  await cache.set('uiVersionsCache', data)

  // smarthr-uiの1バージョンを1ノードとして登録
  data.forEach((item) =>
    createNode({
      version: item.version,
      commitHash: item.commitHash,
      commitDate: item.commitDate,
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
