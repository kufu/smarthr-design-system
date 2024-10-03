import type { StoryIndex, StoryIndexV3, V3CompatIndexEntry } from '@storybook/types'

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

export type UiVersionOption = {
  uiRepoApi: string
  releaseBotEmail: string
  chromaticDomain: string
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

const maxVersions = process.env.SHR_UI_MAX_VERSIONS ? parseInt(process.env.SHR_UI_MAX_VERSIONS, 10) : null

export const fetchUiVersions = async (cachedData: UiVersion[], options: UiVersionOption): Promise<UiVersion[]> => {
  const { uiRepoApi, releaseBotEmail, chromaticDomain } = options
  // GitHubからリリースのコミットを取得
  const releases = []
  let page = 1
  let hasNext = true
  while (hasNext) {
    const res = await fetch(
      `${uiRepoApi}/commits?since=2023-02-02&author=${encodeURIComponent(releaseBotEmail)}&per_page=100&page=${page}`,
    )
    // since=2023-02-02なのは、これ以前はChromaticにデプロイが行われていないため。また、orderのオプションはないが、新→旧の順で取得できる。
    // per_pageのdefaultは30、最大は100。APIドキュメント：https://docs.github.com/ja/rest/commits/commits
    if (!res.ok) {
      hasNext = false
      break
    }
    const json: UiResponse[] = await res.json().catch(() => [])
    releases.push(...json)
    if (json.length === 0) hasNext = false

    page += 1
  }

  const versions: UiVersion[] = []

  for (const item of releases) {
    const versionText = item.commit.message.match(/chore\(release\):\sv?(\d+\.\d+\.\d+)\s/)
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
    const indexRes = await fetch(`https://${commitHash}--${chromaticDomain}/index.json`)
    const indexJson: StoryIndex = await indexRes.json()
    const storiesJson = convertToIndexV3(indexJson)

    // *.stories.tsxのファイルごとに、storyの情報をまとめる
    const uiStories: { [key: string]: V3CompatIndexEntry } = {}
    for (const story of Object.values(storiesJson.stories)) {
      if (story.parameters.docsOnly === true) continue // Docは除外
      const directoryNames = story.parameters.fileName.replace(/^\.\/src\/components\//, '').split('/')
      const storyName = directoryNames[directoryNames.length - 1].replace(/\.stories\.tsx$/, '')
      // Dropdown/DropdownMenuButton のように階層になっている場合は、親階層もデータに含めておく
      const dirName = directoryNames.length > 2 ? directoryNames[0] : ''

      if (!uiStories[storyName]) {
        // v49.0.1以降は、モノレポ化に伴いパスが変わった
        const pathPrefix = version > '49.0.0' ? 'packages/smarthr-ui/' : ''
        uiStories[storyName] = {
          storyName,
          dirName,
          filePath: `${pathPrefix}${story.parameters.fileName}`,
          storyItems: [],
        }
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

    if (maxVersions && versions.length >= maxVersions) break
  }

  return versions
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
