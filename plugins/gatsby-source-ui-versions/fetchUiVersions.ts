export type UiProps = {
  displayName: string
  props: PropsData[]
}

type UiVersion = {
  commitHash: string
  version: string
  uiProps: UiProps[]
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

    versions.push({
      version,
      commitHash,
      uiProps,
    })
  }

  return versions
}
