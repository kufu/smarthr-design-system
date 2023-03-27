import { SHRUI_CHROMATIC_ID, SHRUI_GITHUB_PATH } from '@Constants/application'
import { CSS_COLOR } from '@Constants/style'
import { useLocation } from '@reach/router'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import React, { FC, useCallback, useEffect, useState } from 'react'
import {
  AnchorButton,
  Cluster,
  FaExternalLinkAltIcon,
  InformationPanel,
  Loader,
  Select,
  TabBar,
  TabItem,
  TextLink,
} from 'smarthr-ui'
import packageInfo from 'smarthr-ui/package.json'
import styled from 'styled-components'

import { fetchStoryData } from '../../lib/fetchStoryData'
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
  const defaultStoryData = allMdx.nodes.find((node) => {
    return node.frontmatter?.storyName === name
  })?.fields?.storyData

  const [storyData, setStoryData] = useState({
    code: defaultStoryData?.code ?? '',
    groupPath: defaultStoryData?.groupPath ?? '',
    storyItems: defaultStoryData?.storyItems ?? [],
  })

  const versionOptions =
    allUiVersion.nodes?.map((version) => {
      return {
        label: `v${version.version}`,
        value: version.version,
      }
    }) ?? []

  const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false)
  const [isStoryLoaded, setIsStoryLoaded] = useState<boolean>(false)
  const [currentIFrame, setCurrentIFrame] = useState<string>(storyData.storyItems[0]?.name ?? '')
  const [displayVersion, setDisplayVersion] = useState<string>(packageInfo.version)
  const [showError, setShowError] = useState<boolean>(false)

  const fetchData = useCallback(
    async (version: string) => {
      setDisplayVersion(version)
      setIsStoryLoaded(false)
      setIsIFrameLoaded(false)
      const newData = await fetchStoryData(name, version).catch(() => {
        return null
      })
      if (newData === null || newData.code === '') {
        setShowError(true)
        return
      }
      setStoryData(newData)
      setCurrentIFrame(newData.storyItems[0]?.name ?? '')
      setShowError(false)
    },
    [name],
  )

  // クエリ付きURLでアクセスされた場合
  const location = useLocation()
  useEffect(() => {
    const { search } = location
    const params = new URLSearchParams(search)
    const version = params.get('v')
    if (version === null || version === displayVersion) return

    fetchData(version)
  }, [location, displayVersion, fetchData])

  const onChangeVersion = (version: string) => {
    navigate(`?v=${encodeURI(version)}`)
  }

  const getCommitHash = () => {
    return (
      allUiVersion.nodes?.find((version) => {
        return version.version === displayVersion
      })?.commitHash ?? ''
    )
  }

  const onClickTab = (itemId: string): void => {
    if (itemId === currentIFrame) return

    setIsIFrameLoaded(false)
    setCurrentIFrame(itemId)
    return
  }

  const getStoryName = (currentName: string) => {
    return storyData.storyItems?.find((item) => {
      return item?.name === currentName
    })?.iframeName
  }

  const onIFrameLoaded = () => {
    setIsStoryLoaded(true)
    setIsIFrameLoaded(true)
  }

  return (
    <StoryWrapper>
      <Cluster align="center" justify="space-between" gap={1}>
        <Cluster align="center" as="label">
          <span>SmartHR UI</span>
          <Select
            width="9rem"
            name="version"
            size="s"
            options={versionOptions}
            onChangeValue={onChangeVersion}
            value={displayVersion}
            hasBlank={true}
            //存在しないバージョンでエラーになるの場合は「-」を表示する（空白文字だとデフォルトの「選択してください」になるため）
            //プルダウンに存在しないが、コード表示はできるバージョン（例：v25.0.0）の場合は、そのバージョンを表示する
            decorators={{
              blankLabel: () =>
                showError ||
                !isStoryLoaded ||
                versionOptions.find((option) => {
                  return option.value === displayVersion
                })
                  ? '-'
                  : `v${displayVersion}`,
            }}
            error={showError}
          />
        </Cluster>
        <Cluster>
          <AnchorButton
            href={`https://${getCommitHash()}--${SHRUI_CHROMATIC_ID}.chromatic.com/?path=/story/${storyData.groupPath}`}
            target="_blank"
            size="s"
            suffix={<FaExternalLinkAltIcon />}
          >
            Storybook
          </AnchorButton>
          <AnchorButton
            href={`${SHRUI_GITHUB_PATH}v${displayVersion}/src/components/${name}`}
            target="_blank"
            size="s"
            suffix={<FaExternalLinkAltIcon />}
          >
            GitHub
          </AnchorButton>
        </Cluster>
      </Cluster>
      {showError && (
        <ErrorPanel title="指定されたバージョンのコンポーネント情報を取得できませんでした" type="error" togglable={false}>
          通信状況に問題が発生しているか、次のような理由が考えられます。
          <ul>
            <li>コンポーネント名が変更された</li>
            <li>このバージョンではコンポーネントが存在しない</li>
          </ul>
        </ErrorPanel>
      )}
      {!showError && (
        <>
          <Tab>
            {storyData.storyItems.map((item, index: number) => {
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
                  href={`https://${getCommitHash()}--${SHRUI_CHROMATIC_ID}.chromatic.com/iframe.html?id=${
                    storyData.groupPath
                  }-${getStoryName(currentIFrame)}&viewMode=story`}
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
                    storyData.storyItems.find((item) => {
                      return item?.name === currentIFrame
                    })?.label || ''
                  }
                  src={`https://${getCommitHash()}--${SHRUI_CHROMATIC_ID}.chromatic.com/iframe.html?id=${
                    storyData.groupPath
                  }-${getStoryName(currentIFrame)}`}
                  onLoad={() => onIFrameLoaded()}
                />
              </ResizableContainer>
            </>
          )}
          <CodeWrapper>
            <CodeBlock className="tsx" isStorybook={true}>
              {storyData.code}
            </CodeBlock>
            <StoryLoader className={isStoryLoaded ? '' : '-show'} />
          </CodeWrapper>
        </>
      )}
    </StoryWrapper>
  )
}

const StoryWrapper = styled.div`
  margin-block: 48px 0;
  padding: 16px 24px;
  background-color: ${CSS_COLOR.LIGHT_GREY_3};
`

const ErrorPanel = styled(InformationPanel)`
  margin-block: 24px;
  .smarthr-ui-InformationPanel-title {
    margin-block: 0;
    font-size: 1rem;
  }
`

const Tab = styled(TabBar)`
  margin-block: 24px 0;
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
  background-color: ${CSS_COLOR.WHITE};
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
