import * as cheerio from 'cheerio'

/**
 * SDS内にサムネイルキャプチャ付きのコンポーネント一覧を作るためにChromaticのコンポーネント一覧ページからコンポーネントのキャプチャ情報を取得する
 */
const TARGET_URL = 'https://www.chromatic.com/library?appId=63d0ccabb5d2dd29825524ab&branch=master'

type ApolloValue = {
  id: string
  __typename: string
  resourceKey: string
  displayName: string
  csfId: string
  name: string
  path: string[]
}

type Capture = {
  resourceKey: string
  displayName: string
}

type CaptureByGroup = {
  groupName: string
  captures: Capture[]
}

export const fetchComponentCaptures = async () => {
  const response = await fetch(TARGET_URL)
  const html = await response.text()

  const $ = cheerio.load(html)
  /**
   * ページ内の<script>タグ内にあるJSONデータを取得する
   */
  const jsonScript = $('script#__NEXT_DATA__').html()
  if (!jsonScript) throw new Error('JSON script not found')

  const jsonData = JSON.parse(jsonScript)
  const apolloData = jsonData.props.pageProps.serverState.apollo.data
  const apolloValues: ApolloValue[] = Object.values(apolloData)
  const componentCaptures = apolloValues
    .filter((item) => item.__typename === 'Component')
    .map((component) => {
      const componentKey = `Component:${component.id}`
      /**
       * キャプチャ情報はComponent情報の3つ先にある
       * keysは並び順を保証しないため、このように取得するべきではないが、JSONの構造上他に方法がない
       */
      const componentIndex = Object.keys(apolloData).findIndex((key) => key === componentKey)
      const capture = apolloValues[componentIndex + 3]
      return {
        resourceKey: capture ? capture.resourceKey : '',
        displayName: component.displayName,
        csfId: component.csfId,
        name: component.name,
        path: component.path,
      }
    })

  const capturesByGroup: CaptureByGroup[] = []
  componentCaptures.forEach((componentCapture) => {
    const groupItem = capturesByGroup.find((item) => item.groupName === componentCapture.path[0])
    if (groupItem) {
      groupItem.captures.push({
        displayName: componentCapture.displayName,
        resourceKey: componentCapture.resourceKey,
      })
    } else {
      capturesByGroup.push({
        groupName: componentCapture.path[0],
        captures: [
          {
            displayName: componentCapture.displayName,
            resourceKey: componentCapture.resourceKey,
          },
        ],
      })
    }
  })
  return capturesByGroup
}
