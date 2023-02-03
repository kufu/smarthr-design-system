import { SHRUI_GITHUB_RAW } from '../constants/application'

type StoryItem = {
  name: string
  label: string
  iframeName: string
}

export const fetchStoryData = async (storyName: string) => {
  let storiesCode = ''
  let parentCode = ''

  const storyPaths = storyName.split('/')
  const storyFileName = storyPaths[storyPaths.length - 1]

  // "Dropdown/DropdownMenuButton"のような階層のある名前に対応
  const parentName = storyPaths.length > 1 ? storyPaths[0] : null

  const filePath =
    storyName && storyFileName ? `${SHRUI_GITHUB_RAW}/src/components/${storyName}/${storyFileName}.stories.tsx` : null
  const parentPath = parentName ? `${SHRUI_GITHUB_RAW}/src/components/${parentName}/${parentName}.stories.tsx` : null

  if (filePath) {
    const res = await fetch(filePath)
    storiesCode = res.ok ? await res.text() : ''
  }

  if (parentPath) {
    const res = await fetch(parentPath)
    parentCode = res.ok ? await res.text() : ''
  }

  //親グループ名（例："Buttons（ボタン）"）を取得
  const targetCode = parentCode === '' ? storiesCode : parentCode
  const matchGroupNames = targetCode.matchAll(/export\sdefault\s\{\s+title:.*?'(.*?)'/gm)
  const groupNames = [...matchGroupNames].map((result) => {
    return result
  })
  const groupPath = groupNames.length > 0 ? `${groupNames[0][1].replace(/\s|\//g, '-').toLowerCase()}` : ''

  // "export const AccordionStyle: Story" や "export const All = Template.bind({})" のような、Story名をexportするコードから名前を抜き出す
  // 注意1：export { Default as DropdownButton } from ...のようなコードにはマッチしない
  // 注意2：ストーリー名に全角文字が入るケースがある（例：Body以外のPortalParent）
  const matchStoryNames = storiesCode.matchAll(
    /export\sconst\s([\w\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]*)/g,
  )
  const items1 = [...matchStoryNames].map((result) => {
    // '_'を削除
    const name = result[1].replace('_', '')
    // 文字列中の大文字の前にスペースを追加してラベルにする
    const label = name.replace(/.([A-Z])/g, (s) => {
      return `${s.charAt(0)} ${s.slice(1, s.length)}`
    })
    return { name, label }
  })

  // ".add('full', "のようなケースもある（e.g. MessageScreen.stories.tsx）
  const matchAddNames = storiesCode.matchAll(/\.add\('(.*?)',\s/g)
  const items2 = [...matchAddNames].map((result) => {
    // UpperCamel caseにする
    const name = result[1]
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1, word.length)
      })
      .join('')
    return { name, label: result[1] }
  })

  // "AccordionStyle.storyName = 'Accordion style'" のような表示名の定義があればラベルとして利用する
  const storyLabels: { [key: string]: string } = {}
  const matchStoryLabels = storiesCode.matchAll(/(\S*)\.storyName\s=\s'(.*)'/g)
  Array.from(matchStoryLabels).forEach((result) => {
    storyLabels[result[1]] = result[2]
  })

  const storyItems: StoryItem[] = [...items1, ...items2].map((item) => {
    // iframeのURL用にケバブケースの名前を作る
    const kebab =
      parentCode === '' // 階層あり・なしの場合分け
        ? item.name
            .replace(/([A-Z])/g, (s) => {
              return '-' + s.charAt(0).toLowerCase()
            })
            .replace(/^[a-z]+$/, (s) => `-${s.charAt(0)}`)
            .replace(/^_/, '') // コンポーネントとStoryが同名の場合に、頭に'_'がついていることがあるので、削除
        : storyName.replace(/^.*\//, '').replace(/([A-Z])/g, (s) => {
            return '-' + s.charAt(0).toLowerCase()
          })

    return {
      name: item.name,
      label: storyLabels[item.name] || item.name,
      iframeName: kebab,
    }
  })

  return {
    code: storiesCode,
    storyItems,
    groupPath,
  }
}
