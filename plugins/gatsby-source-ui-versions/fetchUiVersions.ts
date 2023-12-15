// gatsby-nodeに登録するデータの型定義
export type UiVersion = {
  commitHash: string
  commitDate: string
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
  dirName: string
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
    author: {
      date: string
    }
  }
}

type PropsResponse = {
  displayName: string
  dirName: string
  filePath: string
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

export const fetchUiVersions = async (cachedData: UiVersion[]): Promise<UiVersion[]> => {
  // GitHubからリリースのコミットを取得
  const res = await fetch(`${uiRepoApi}/commits?since=2023-02-02&author=${encodeURIComponent(releaseBotEmail)}&per_page=100`)
  // since=2023-02-02なのは、これ以前はChromaticにデプロイが行われていないため。また、orderのオプションはないが、新→旧の順で取得できる。
  // per_pageのdefaultは30、最大は100。100以上になるケースは考慮していない。
  if (!res.ok) return []
  const json: UiResponse[] = await res.json().catch(() => [])

  const versions: UiVersion[] = []

  for (const item of json) {
    const versionText = item.commit.message.match(/chore\(release\):\s(\d+\.\d+\.\d+)\s/)
    const version = versionText && versionText.length > 1 ? versionText[1] : null
    if (version === null) continue

    // そのバージョンのキャッシュがあればそれを使う
    const cachedVersionData = cachedData?.find((cachedItem) => cachedItem.version === version)
    if (cachedVersionData) {
      versions.push(cachedVersionData)
      continue
    }

    const commitHash = item.sha.substring(0, 7)
    const commitDate = item.commit.author.date

    // Chromaticからsmarthr-ui-props.jsonを取得
    const propsRes = await fetch(`https://${commitHash}--${chromaticDomain}/exports/smarthr-ui-props.json`)
    let props: [] = []
    if (propsRes.status === 200) {
      props = await propsRes.json().catch(() => [])
    }

    const uiProps = props.map((propsItem: PropsResponse) => {
      // Dropdown/DropdownMenuButton のように階層になっている場合は、親階層もデータに含めておく
      const directoryNames = propsItem.filePath.replace(/^.*lib\/components\//, '').split('/')
      const dirName = directoryNames.length > 2 ? directoryNames[0] : ''
      return {
        displayName: propsItem.displayName || '',
        dirName,
        props: propsItem.props?.map((prop) => ({
          description: prop.description || '',
          name: prop.name || '',
          required: prop.required || false,
          type: {
            name: prop.type?.name || '',
            value: prop.type?.value || [],
          },
        })),
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
      // Dropdown/DropdownMenuButton のように階層になっている場合は、親階層もデータに含めておく
      const dirName = directoryNames.length > 2 ? directoryNames[0] : ''

      if (!uiStories[storyName]) {
        uiStories[storyName] = { storyName, dirName, filePath: story.parameters.fileName, storyItems: [] }
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
      commitDate,
      uiProps,
      uiStories: Object.values(uiStories),
    })
  }

  return versions
}
