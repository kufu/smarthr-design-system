import React, { VFC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Loader, TabBar, TabItem, TextLink } from 'smarthr-ui'

import { SHRUI_GITHUB_RAW, SHRUI_STORYBOOK_IFRAME } from '@Constants/application'
import { CSS_COLOR } from '@Constants/style'
import { CodeBlock } from '../article/CodeBlock'

import { ResizableContainer } from './ResizableContainer'

type Props = {
  name: string
}

type StoryItem = {
  name: string
  label: string
}

export const ComponentStory: VFC<Props> = ({ name }) => {
  const fileName = name.replace(/^.*\//, '') // "Layout/Cluster"のような階層のある名前に対応
  const filePath = `${SHRUI_GITHUB_RAW}/src/components/${name}/${fileName}.stories.tsx`

  const [storiesCode, setStoriesCode] = useState<string>('')
  const [storyItems, setStoryItems] = useState<StoryItem[]>([])
  const [currentIFrame, setCurrentIFrame] = useState<string>('')
  const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false)
  const [isCodeLoaded, setIsCodeLoaded] = useState<boolean>(false)

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
    if (storiesCode === '') return

    // "export const AccordionStyle: Story" や "export const All = Template.bind({})" のような、Story名をexportするコードから名前を抜き出す
    // 注意：export { Default as DropdownButton } from ...のようなコードにはマッチしない
    const matchStoryNames = storiesCode.matchAll(/export\sconst\s(\w*)/g)
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
  }, [storiesCode])

  const onClickTab = (itemId: string): void => {
    if (itemId === currentIFrame) return

    setIsIFrameLoaded(false)
    setCurrentIFrame(itemId)
    return
  }

  const getStoryName = (componentName: string, itemName: string) => {
    // 'Layout/Cluster' のような階層ありの場合
    if (componentName.includes('/')) {
      return componentName
        .replace(/([A-Z])/g, (s) => {
          return '-' + s.charAt(0).toLowerCase()
        })
        .replace('/', '-')
        .replace(/^_|-/, '')
    }

    // 階層なしの場合
    const kebab = itemName
      // UpperCamel case -> Kebab case
      .replace(/([A-Z])/g, (s) => {
        return '-' + s.charAt(0).toLowerCase()
      })
      // 小文字のみの場合に `-item-name` とならないので補完
      .replace(/^[a-z]+$/, (s) => `-${s.charAt(0)}`)
      // コンポーネントとStoryが同名の場合に、頭に'_'がついていることがあるので、削除
      .replace(/^_/, '')
    return `${componentName.toLowerCase()}-${kebab}`
  }

  if (typeof window === undefined || storiesCode === '') {
    return null
  }
  return (
    <>
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
            <TextLink href={`${SHRUI_STORYBOOK_IFRAME}?id=${getStoryName(name, currentIFrame)}&viewMode=story`} target="_blank">
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
              src={`${SHRUI_STORYBOOK_IFRAME}?id=${getStoryName(name, currentIFrame)}`}
              onLoad={() => setIsIFrameLoaded(true)}
            />
          </ResizableContainer>
        </>
      )}
      <CodeWrapper>
        <StoryLoader className={isCodeLoaded ? '' : '-show'} />
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
