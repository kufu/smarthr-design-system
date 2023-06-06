const STORYBOOK_URL = 'https://story.smarthr-ui.dev'

type Story = {
  kind: string
  tags: string[]
}

type StoryKind = {
  kindName: string
  iframeUrl: string
  thumbnailFileName: string
  displayName: string
  numberOfStories: number
}

export type StoryGroup = {
  groupName: string
  storyKinds: StoryKind[]
}

export const fetchComponentCaptures = async () => {
  const response = await fetch(`${STORYBOOK_URL}/stories.json`)
  const jsonData = await response.json()
  const storiesMap: { [id: string]: Story } = jsonData.stories

  const storyGroups: StoryGroup[] = []
  Object.keys(storiesMap).forEach((id) => {
    const { kind, tags } = storiesMap[id]
    if (tags.includes('docs')) return // ドキュメントはコンポーネント一覧として表示しない

    const groupName = kind.split('/')[0]
    const displayName = kind.split('/')[1]
    const iframeUrl = `${STORYBOOK_URL}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story&shortcuts=false&singleStory=true`
    const thumbnailFileName = `${groupName}-${displayName}.png`

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
        numberOfStories: 1,
      })
      return
    }

    // GroupもKindも既に存在すればカウントアップ
    storyKind.numberOfStories += 1
  })
  return storyGroups
}
