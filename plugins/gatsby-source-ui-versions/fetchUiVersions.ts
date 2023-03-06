type UiVersion = {
  commitHash: string
  version: string
}

type UiResponse = {
  sha: string
  commit: {
    message: string
  }
}

const uiRepoApi = 'https://api.github.com/repos/kufu/smarthr-ui'
const releaseBotEmail = '41898282+github-actions[bot]@users.noreply.github.com'

export const fetchUiVersions = async (): Promise<UiVersion[]> => {
  const res = await fetch(`${uiRepoApi}/commits?since=2023-02-02&author=${encodeURIComponent(releaseBotEmail)}`)
  if (!res.ok) return []
  const json = await res.json()

  return json
    .map((item: UiResponse) => {
      const versionText = item.commit.message.match(/chore\(release\):\s(\d+\.\d+\.\d+)\s/)
      const version = versionText && versionText.length > 1 ? versionText[1] : null
      return {
        commitHash: item.sha.substring(0, 7),
        version,
      }
    })
    .filter((item: UiVersion) => {
      return item.version !== null
    })
}
