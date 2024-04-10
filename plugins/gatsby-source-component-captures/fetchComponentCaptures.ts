import fs from 'fs/promises'
import { cwd } from 'node:process'
import path from 'path'

import { StoryIndex, StoryIndexV3, V3CompatIndexEntry } from '@storybook/types'

const STORYBOOK_URL = 'https://story.smarthr-ui.dev'

type Story = {
  kind: string
  importPath: string
  tags: string[]
}

type StoryKind = {
  kindName: string
  iframeUrl: string
  thumbnailFileName: string
  displayName: string
  componentPath: string
  numberOfStories: number
}

export type StoryGroup = {
  groupName: string
  storyKinds: StoryKind[]
}

const convertKebab = (target: string) =>
  target
    .replace('SmartHR', 'smarthr') // 特殊なケース
    .replace(/[^a-zA-Z0-9-]/g, '') // 全角文字などの半角英数字以外を除去
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()

const convertComponentPath = (importPath: string, displayName: string) => {
  const matches = importPath.match(/\.\/src\/components\/(.*)\.stories\.tsx/)
  if (!matches) return ''
  const componentDirPath = matches[1]
    .split('/')
    .slice(0, -2)
    .map((item) => convertKebab(item))
    .join('/')
  const componentPathName = convertKebab(displayName)
  return componentDirPath === '' ? componentPathName : `${componentDirPath}/${componentPathName}`
}

const isExistsFile = async (filePath: string) => {
  try {
    await fs.stat(filePath)
    return true
  } catch (err) {
    return false
  }
}

export const fetchComponentCaptures = async () => {
  const response = await fetch(`${STORYBOOK_URL}/index.json`)
  const jsonData: StoryIndex = await response.json()
  const storiesJson = convertToIndexV3(jsonData)

  const storiesMap: { [id: string]: V3CompatIndexEntry } = storiesJson.stories

  const storyGroups: StoryGroup[] = []

  for (const id in storiesMap) {
    const { kind, tags, importPath } = storiesMap[id]
    if (Array.isArray(tags) && tags.includes('docs')) continue // ドキュメントはコンポーネント一覧として表示しない

    const groupName = kind.split('/')[0]
    const displayName = kind.split('/')[1]
    const thumbnailFileName = `${groupName}-${displayName}.png`
    const iframeUrl = `${STORYBOOK_URL}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story&shortcuts=false&singleStory=true`
    const componentPath = convertComponentPath(importPath, displayName)

    const componentsDirPath = path.resolve(cwd(), 'content', 'articles', 'products', 'components')
    const mdxFilePath = `${componentsDirPath}/${componentPath}.mdx`
    const indexMdxFilePath = `${componentsDirPath}/${componentPath}/index.mdx`

    const isExistsMdx = (await isExistsFile(mdxFilePath)) || (await isExistsFile(indexMdxFilePath))
    if (!isExistsMdx) {
      continue
    }

    // Groupが存在しない場合は新規作成
    const storyGroup = storyGroups.find((item) => item.groupName === groupName)
    if (!storyGroup) {
      storyGroups.push({
        groupName,
        storyKinds: [
          {
            kindName: kind,
            iframeUrl,
            thumbnailFileName,
            displayName,
            componentPath,
            numberOfStories: 1,
          },
        ],
      })
      continue
    }

    // Kindが存在しない場合は新規作成
    const storyKind = storyGroup.storyKinds.find((item) => item.kindName === kind)
    if (!storyKind) {
      storyGroup.storyKinds.push({
        kindName: kind,
        iframeUrl,
        thumbnailFileName,
        displayName,
        componentPath,
        numberOfStories: 1,
      })
      continue
    }

    // GroupもKindも既に存在すればカウントアップ
    storyKind.numberOfStories += 1
  }
  return storyGroups
}

// stories.json が消えたための変換
// via https://github.com/storybookjs/storybook/blob/c67bf6785fdc67510721444aea6cacf3e3a5c228/MIGRATION.md#removed-storiesjson
const convertToIndexV3 = (index: StoryIndex): StoryIndexV3 => {
  const { entries } = index
  const stories = Object.entries(entries).reduce(
    (acc, [id, entry]) => {
      const { type, ...rest } = entry
      acc[id] = {
        ...rest,
        kind: rest.title,
        story: rest.name,
        parameters: {
          __id: rest.id,
          docsOnly: type === 'docs',
          fileName: rest.importPath,
        },
      }
      return acc
    },
    {} as StoryIndexV3['stories'],
  )
  return {
    v: 3,
    stories,
  }
}
