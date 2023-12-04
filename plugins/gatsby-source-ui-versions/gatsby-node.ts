import fs from 'fs'
import path from 'path'

import { SourceNodesArgs } from 'gatsby'

import { fetchUiVersions } from './fetchUiVersions'

const NODE_TYPE = `UiVersion`

exports.onPreInit = () => {
  try {
    fs.copyFileSync(
      path.join(process.cwd(), './node_modules/smarthr-ui/smarthr-ui.css'),
      path.join(process.cwd(), './static/smarthr-ui.css'),
    )
    console.log('smarthr-ui.css をコピーしました!!')
  } catch (error) {
    console.error('Error copy smarthr-ui.css from node_modules:', error)
  }
}

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }: SourceNodesArgs) => {
  const { createNode } = actions

  const data = await fetchUiVersions()

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
