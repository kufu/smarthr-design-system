import { SourceNodesArgs } from 'gatsby'

import { fetchUiVersions } from './fetchUiVersions'

import type { UiVersion, UiVersionOption } from './fetchUiVersions'

const NODE_TYPE = `UiVersion`

let options: UiVersionOption = {
  uiRepoApi: '',
  releaseBotEmail: '',
  chromaticDomain: '',
  fetchLimit: 100,
}

exports.onPreInit = (_: any, pluginOptions: UiVersionOption) => {
  options = pluginOptions
}

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId, cache }: SourceNodesArgs) => {
  const { createNode } = actions

  const cachedData: UiVersion[] = await cache.get('uiVersionsCache')
  const data = await fetchUiVersions(cachedData, options)
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
