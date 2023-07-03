// gatsby-nodeに登録するデータの型定義
type UiVersion = {
  commitHash: string
  version: string
  uiProps: Array<{
    displayName: string
    props: PropsData[]
  }>
  uiStories: UiStories[]
}

type PropsData = {
  description: string
  name: string
  required: boolean
  type: {
    name: string
    value: Array<{ value: string }>
  }
}

type UiStories = {
  storyName: string
  filePath: string
  storyItems: Array<{
    name: string
    label: string
    iframeName: string
  }>
}

// APIから取得するデータの型定義
type UiResponse = {
  sha: string
  commit: {
    message: string
  }
}

type PropsResponse = {
  displayName: string
  props: PropsData[]
}

type StoriesJson = {
  stories: {
    [key: string]: {
      id: string
      title: string
      name: string
      kind: string
      story: string
      parameters: {
        docsOnly: boolean
        fileName: string
      }
    }
  }
}

const uiRepoApi = 'https://api.github.com/repos/kufu/smarthr-ui'
const releaseBotEmail = '41898282+github-actions[bot]@users.noreply.github.com'
const chromaticDomain = '63d0ccabb5d2dd29825524ab.chromatic.com'

export const fetchUiVersions = async (): Promise<UiVersion[]> => {
  // GitHubからリリースのコミットを取得
  const res = await fetch(`${uiRepoApi}/commits?since=2023-02-02&author=${encodeURIComponent(releaseBotEmail)}`)
  if (!res.ok) return []
  const json: UiResponse[] = await res.json().catch(() => {
    return []
  })

  const versions: UiVersion[] = []

  for (const item of json) {
    const versionText = item.commit.message.match(/chore\(release\):\s(\d+\.\d+\.\d+)\s/)
    const version = versionText && versionText.length > 1 ? versionText[1] : null
    if (version === null) continue

    const commitHash = item.sha.substring(0, 7)

    // Chromaticからsmarthr-ui-props.jsonを取得
    const propsRes = await fetch(`https://${commitHash}--${chromaticDomain}/exports/smarthr-ui-props.json`)
    let props: [] = []
    if (propsRes.status === 200) {
      props = await propsRes.json().catch(() => {
        return []
      })
    }

    const uiProps = props.map((propsItem: PropsResponse) => {
      return {
        displayName: propsItem.displayName || '',
        props: propsItem.props?.map((prop) => {
          return {
            description: prop.description || '',
            name: prop.name || '',
            required: prop.required || false,
            type: {
              name: prop.type?.name || '',
              value: prop.type?.value || [],
            },
          }
        }),
      }
    })

    // Chromaticからstories.jsonを取得
    const storiesRes = await fetch(`https://${commitHash}--${chromaticDomain}/stories.json`)
    const storiesJson: StoriesJson = await storiesRes.json()

    // *.stories.tsxのファイルごとに、storyの情報をまとめる
    const uiStories: { [key: string]: UiStories } = {}
    for (const story of Object.values(storiesJson.stories)) {
      if (story.parameters.docsOnly === true) continue // Docは除外
      const directoryNames = story.parameters.fileName.replace(/^\.\/src\/components\//, '').split('/')
      const storyName = directoryNames[directoryNames.length - 1].replace(/\.stories\.tsx$/, '')

      if (!uiStories[storyName]) {
        uiStories[storyName] = { storyName, filePath: story.parameters.fileName, storyItems: [] }
      }
      uiStories[storyName].storyItems.push({
        name: story.title,
        label: story.name,
        iframeName: story.id,
      })
    }

    // バージョンごとに、バージョン番号・コミットハッシュ・props・storiesの情報を配列に格納
    versions.push({
      version,
      commitHash,
      uiProps,
      uiStories: Object.values(uiStories),
    })
  }

  return versions
}
