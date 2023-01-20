import { SmartHRUIMetaInfo } from '@Components/SmartHRUIMetaInfo'
import { SHRUI_GITHUB_RAW, SHRUI_STORYBOOK_IFRAME } from '@Constants/application'
import { CSS_COLOR } from '@Constants/style'
import React, { FC, useEffect, useState } from 'react'
import { Loader, TabBar, TabItem, TextLink } from 'smarthr-ui'
import styled from 'styled-components'

import { CodeBlock } from '../article/CodeBlock'

import { ResizableContainer } from './ResizableContainer'

type Props = {
  name: string
}

type StoryItem = {
  name: string
  label: string
}

export const ComponentStory: FC<Props> = ({ name }) => {
  const storyPaths = name.split('/')
  const fileName = storyPaths[storyPaths.length - 1]

  // "Dropdown/DropdownButton"のような階層のある名前に対応
  const parentName = storyPaths.length > 1 ? storyPaths[0] : null

  const filePath = `${SHRUI_GITHUB_RAW}/src/components/${name}/${fileName}.stories.tsx`
  const parentPath = `${SHRUI_GITHUB_RAW}/src/components/${parentName}/${parentName}.stories.tsx`

  const [storiesCode, setStoriesCode] = useState<string>('')
  const [parentCode, setParentCode] = useState<string>('')
  const [storyItems, setStoryItems] = useState<StoryItem[]>([])
  const [groupPath, setGroupPath] = useState<string>('')
  const [currentIFrame, setCurrentIFrame] = useState<string>('')
  const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false)
  const [isCodeLoaded, setIsCodeLoaded] = useState<boolean>(false)
  const [isParentCodeLoaded, setIsParentCodeLoaded] = useState<boolean>(false)

  useEffect(() => {
    const fetchCode = async () => {
      const res = await fetch(filePath)

      // 404の場合など
      if (res.status >= 400) {
        setIsCodeLoaded(true)
        return
      }

      const text = await res.text()
      setStoriesCode(text)

      setIsCodeLoaded(true)
    }
    fetchCode()
  }, [filePath])

  useEffect(() => {
    if (parentPath === null) {
      setIsParentCodeLoaded(true)
      return
    }

    const fetchCode = async () => {
      const res = await fetch(parentPath)

      // 404の場合など
      if (res.status >= 400) {
        setIsParentCodeLoaded(true)
        return
      }

      const text = await res.text()
      setParentCode(text)

      setIsParentCodeLoaded(true)
    }
    fetchCode()
  }, [parentPath])

  useEffect(() => {
    if (!(isCodeLoaded && isParentCodeLoaded)) return

    //親グループ名（例："Buttons（ボタン）"）を取得
    const targetCode = parentCode === '' ? storiesCode : parentCode
    const matchGroupNames = targetCode.matchAll(/export\sdefault\s\{\s+title:.*?'(.*?)'/gm)
    const groupNames = [...matchGroupNames].map((result) => {
      return result
    })
    setGroupPath(groupNames.length > 0 ? `${groupNames[0][1].replace(/\s|\//g, '-').toLowerCase()}` : '')

    // "export const AccordionStyle: Story" や "export const All = Template.bind({})" のような、Story名をexportするコードから名前を抜き出す
    // 注意1：export { Default as DropdownButton } from ...のようなコードにはマッチしない
    // 注意2：ストーリー名に全角文字が入るケースがある（例：Body以外のPortalParent）
    const matchStoryNames = storiesCode.matchAll(
      /export\sconst\s([\w\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]*)/g,
    )
    const items1 = [...matchStoryNames].map((result) => {
      // '_'を削除
      const storyName = result[1].replace('_', '')
      // 文字列中の大文字の前にスペースを追加してラベルにする
      const storyLabel = storyName.replace(/.([A-Z])/g, (s) => {
        return `${s.charAt(0)} ${s.slice(1, s.length)}`
      })
      return { name: storyName, label: storyLabel }
    })

    // ".add('full', "のようなケースもある（e.g. MessageScreen.stories.tsx）
    const matchAddNames = storiesCode.matchAll(/\.add\('(.*?)',\s/g)
    const items2 = [...matchAddNames].map((result) => {
      // UpperCamel caseにする
      const storyName = result[1]
        .split(' ')
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1, word.length)
        })
        .join('')
      return { name: storyName, label: result[1] }
    })

    const items = [...items1, ...items2]

    // "AccordionStyle.storyName = 'Accordion style'" のような表示名の定義があればラベルとして利用する
    const matchStoryLabels = storiesCode.matchAll(/(\S*)\.storyName\s=\s'(.*)'/g)
    Array.from(matchStoryLabels).forEach((result) => {
      const targetItem = items.find((item) => {
        return item.name === result[1]
      })
      if (targetItem) targetItem.label = result[2]
    })

    if (items.length > 0) setCurrentIFrame(items[0].name)
    setStoryItems(items)
  }, [storiesCode, parentCode, isCodeLoaded, isParentCodeLoaded])

  const onClickTab = (itemId: string): void => {
    if (itemId === currentIFrame) return

    setIsIFrameLoaded(false)
    setCurrentIFrame(itemId)
    return
  }

  const getStoryName = (componentName: string, itemName: string) => {
    // 'Dropdown/FilterDropdown' のような階層ありの場合
    if (componentName.includes('/')) {
      return componentName.replace(/^.*\//, '').replace(/([A-Z])/g, (s) => {
        return '-' + s.charAt(0).toLowerCase()
      })
    }
    const kebab = itemName
      // UpperCamel case -> Kebab case
      .replace(/([A-Z])/g, (s) => {
        return '-' + s.charAt(0).toLowerCase()
      })
      // 小文字のみの場合に `-item-name` とならないので補完
      .replace(/^[a-z]+$/, (s) => `-${s.charAt(0)}`)
      // コンポーネントとStoryが同名の場合に、頭に'_'がついていることがあるので、削除
      .replace(/^_/, '')
    return `${kebab}`
  }

  if (typeof window === undefined || storiesCode === '') {
    return null
  }
  return (
    <>
      <SmartHRUIMetaInfo name={name} groupPath={groupPath} />
      <Tab>
        {storyItems.map((item: StoryItem, index: number) => {
          return (
            <TabItem id={item.name} key={index} onClick={onClickTab} selected={item.name === currentIFrame}>
              {item.label}
            </TabItem>
          )
        })}
      </Tab>
      {currentIFrame !== '' && (
        <>
          <LinkWrapper>
            <TextLink
              href={`${SHRUI_STORYBOOK_IFRAME}?id=${groupPath}-${getStoryName(name, currentIFrame)}&viewMode=story`}
              target="_blank"
            >
              別画面で開く
            </TextLink>
          </LinkWrapper>
          <ResizableContainer defaultWidth="100%" defaultHeight="300px">
            <StoryLoader className={isIFrameLoaded ? '' : '-show'} />
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <StoryIframe
              title={
                storyItems.find((item) => {
                  return item.name === currentIFrame
                })?.label || ''
              }
              src={`${SHRUI_STORYBOOK_IFRAME}?id=${groupPath}-${getStoryName(name, currentIFrame)}`}
              onLoad={() => setIsIFrameLoaded(true)}
            />
          </ResizableContainer>
        </>
      )}
      <CodeWrapper>
        <StoryLoader className={isCodeLoaded && isParentCodeLoaded ? '' : '-show'} />
        <CodeBlock className="tsx">{storiesCode}</CodeBlock>
      </CodeWrapper>
    </>
  )
}

const Tab = styled(TabBar)`
  margin-block: 48px 0;
  flex-wrap: wrap;
  gap: 4px 0;
`

const LinkWrapper = styled.div`
  margin-block: 16px 0;
  font-size: 0.8rem;
  text-align: right;
`

const StoryIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`

const StoryLoader = styled(Loader)`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &.-show {
    display: block;
  }
`

const CodeWrapper = styled.div`
  position: relative;
  border: solid 1px ${CSS_COLOR.LIGHT_GREY_1};
  > pre {
    margin: 0;
    height: 300px;
    border: 0;
    overflow: hidden;
    overflow-y: scroll;
    resize: vertical;
  }
`
