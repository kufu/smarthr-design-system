export type UiProps = {
  displayName: string
  props: PropsData[]
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

type UiVersion = {
  commitHash: string
  version: string
  uiProps: UiProps[]
  uiStories: UiStories[]
}

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

type PropsData = {
  description: string
  name: string
  required: boolean
  type: {
    name: string
    value: Array<{ value: string }>
  }
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

    const storiesRes = await fetch(`https://${commitHash}--${chromaticDomain}/stories.json`)
    const storiesJson: StoriesJson = await storiesRes.json()

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

    versions.push({
      version,
      commitHash,
      uiProps,
      uiStories: Object.values(uiStories),
    })
  }

  return versions
}
