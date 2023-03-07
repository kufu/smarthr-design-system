import { SHRUI_CHROMATIC_ID, SHRUI_GITHUB_PATH } from '@Constants/application'
import { CSS_COLOR, CSS_SIZE } from '@Constants/style'
import { graphql, useStaticQuery } from 'gatsby'
import React, { FC, useState } from 'react'
import { Cluster, FaExternalLinkAltIcon, Loader, Select, TabBar, TabItem, TextLink } from 'smarthr-ui'
import packageInfo from 'smarthr-ui/package.json'
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
    allUiVersion {
      nodes {
        version
        commitHash
      }
    }
  }
`

export const ComponentStory: FC<Props> = ({ name }) => {
  const { allMdx, allUiVersion } = useStaticQuery<Queries.StoryDataQuery>(query)
  const storyData = allMdx.nodes.find((node) => {
    return node.frontmatter?.storyName === name
  })?.fields?.storyData

  const versions = allUiVersion.nodes.map((node) => {
    return {
      version: node.version,
      commitHash: node.commitHash,
    }
  })

  const code = storyData?.code ?? ''
  const groupPath = storyData?.groupPath ?? ''
  const storyItems = storyData?.storyItems ?? []

  const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false)
  const [currentIFrame, setCurrentIFrame] = useState<string>(storyItems[0]?.name ?? '')
  const [displayVersion, setDisplayVersion] = useState<string>(packageInfo.version)

  const options =
    versions?.map((version) => {
      return {
        label: `v${version.version}`,
        value: version.version,
      }
    }) ?? []

  const onChangeVersion = (version: string) => {
    setDisplayVersion(version)
  }

  const currentCommitHash = () => {
    return (
      versions?.find((version) => {
        return version.version === displayVersion
      })?.commitHash ?? 'master'
    )
  }

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
      <MetaWrapper justify="space-between" align="center">
        <Cluster align="center" as="label">
          <span>SmartHR UI</span>
          <Select width="100px" name="displayVersion" options={options} onChangeValue={onChangeVersion} />
        </Cluster>
        <StyledUl>
          <li>
            <a
              href={`https://${currentCommitHash()}--${SHRUI_CHROMATIC_ID}.chromatic.com/?${groupPath}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaExternalLinkAltIcon /> Storybook
            </a>
          </li>
          <li>
            <a href={`${SHRUI_GITHUB_PATH}v${displayVersion}/src/components/${name}`} target="_blank" rel="noreferrer">
              <FaExternalLinkAltIcon /> ソースコード（GitHub）
            </a>
          </li>
        </StyledUl>
      </MetaWrapper>
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
              href={`https://${currentCommitHash()}--${SHRUI_CHROMATIC_ID}.chromatic.com/iframe.html?id=${groupPath}-${getStoryName(
                currentIFrame,
              )}&viewMode=story`}
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
              src={`https://${currentCommitHash()}--${SHRUI_CHROMATIC_ID}.chromatic.com/iframe.html?id=${groupPath}-${getStoryName(
                currentIFrame,
              )}`}
              onLoad={() => setIsIFrameLoaded(true)}
            />
          </ResizableContainer>
        </>
      )}
      <CodeWrapper>
        <CodeBlock className="tsx" isStorybook={true}>
          {code}
        </CodeBlock>
      </CodeWrapper>
    </>
  )
}

const MetaWrapper = styled(Cluster)`
  flex-direction: row-reverse;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    > ul {
      width: 100%;
    }
  }
`

const StyledUl = styled.ul`
  list-style: none;
  margin-block: 16px 0;
  padding: 0;
  > li {
    line-height: 2;
  }
`

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
`
