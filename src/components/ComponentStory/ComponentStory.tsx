import { SmartHRUIMetaInfo } from '@Components/SmartHRUIMetaInfo'
import { SHRUI_STORYBOOK_IFRAME } from '@Constants/application'
import { CSS_COLOR } from '@Constants/style'
import { graphql, useStaticQuery } from 'gatsby'
import React, { FC, useState } from 'react'
import { Loader, TabBar, TabItem, TextLink } from 'smarthr-ui'
import styled from 'styled-components'

import { CodeBlock } from '../article/CodeBlock'

import { ResizableContainer } from './ResizableContainer'

type Props = {
  name: string
}

const query = graphql`
  query StoryData {
    allMdx(filter: { frontmatter: { storyName: { ne: null } } }) {
      nodes {
        frontmatter {
          storyName
        }
        fields {
          storyData {
            code
            storyItems {
              label
              name
              iframeName
            }
            groupPath
          }
        }
      }
    }
  }
`

export const ComponentStory: FC<Props> = ({ name }) => {
  const {
    allMdx: { nodes },
  } = useStaticQuery<Queries.StoryDataQuery>(query)
  const storyData = nodes.find((node) => {
    return node.frontmatter?.storyName === name
  })?.fields?.storyData

  const code = storyData?.code ?? ''
  const groupPath = storyData?.groupPath ?? ''
  const storyItems = storyData?.storyItems ?? []

  const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false)
  const [currentIFrame, setCurrentIFrame] = useState<string>(storyItems[0]?.name ?? '')

  const onClickTab = (itemId: string): void => {
    if (itemId === currentIFrame) return

    setIsIFrameLoaded(false)
    setCurrentIFrame(itemId)
    return
  }

  const getStoryName = (currentName: string) => {
    return storyItems?.find((item) => {
      return item?.name === currentName
    })?.iframeName
  }

  return (
    <>
      <SmartHRUIMetaInfo name={name} groupPath={groupPath} />
      <Tab>
        {storyItems.map((item, index: number) => {
          return (
            <TabItem id={item?.name ?? ''} key={index} onClick={onClickTab} selected={item?.name === currentIFrame}>
              {item?.label}
            </TabItem>
          )
        })}
      </Tab>
      {currentIFrame !== '' && (
        <>
          <LinkWrapper>
            <TextLink
              href={`${SHRUI_STORYBOOK_IFRAME}?id=${groupPath}-${getStoryName(currentIFrame)}&viewMode=story`}
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
                  return item?.name === currentIFrame
                })?.label || ''
              }
              src={`${SHRUI_STORYBOOK_IFRAME}?id=${groupPath}-${getStoryName(currentIFrame)}`}
              onLoad={() => setIsIFrameLoaded(true)}
            />
          </ResizableContainer>
        </>
      )}
      <CodeWrapper>
        <CodeBlock className="tsx">{code}</CodeBlock>
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
