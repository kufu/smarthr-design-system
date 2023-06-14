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

const convertKebab = (target: string) => {
  return target
    .replace('SmartHR', 'smarthr') // 特殊なケース
    .replace(/[^a-zA-Z0-9-]/g, '') // 全角文字などの半角英数字以外を除去
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

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

export const fetchComponentCaptures = async () => {
  const response = await fetch(`${STORYBOOK_URL}/stories.json`)
  const jsonData = await response.json()
  const storiesMap: { [id: string]: Story } = jsonData.stories

  const storyGroups: StoryGroup[] = []
  Object.keys(storiesMap).forEach((id) => {
    const { kind, tags, importPath } = storiesMap[id]
    if (tags.includes('docs')) return // ドキュメントはコンポーネント一覧として表示しない

    const groupName = kind.split('/')[0]
    const displayName = kind.split('/')[1]
    const thumbnailFileName = `${groupName}-${displayName}.png`
    const iframeUrl = `${STORYBOOK_URL}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story&shortcuts=false&singleStory=true`
    const componentPath = convertComponentPath(importPath, displayName)

    // 下記のものはSDSにページが無いので排除する
    if (['Balloon', 'SideMenu'].includes(displayName)) return

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
      return
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
      return
    }

    // GroupもKindも既に存在すればカウントアップ
    storyKind.numberOfStories += 1
  })
  return storyGroups
}
