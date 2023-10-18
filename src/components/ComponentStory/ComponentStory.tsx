import { SHRUI_CHROMATIC_ID, SHRUI_GITHUB_PATH, SHRUI_GITHUB_RAW } from '@Constants/application'
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

import { CodeBlock } from '../article/CodeBlock'

import { ResizableContainer } from './ResizableContainer'

type Props = {
  name: string
  dirName?: string
}

const query = graphql`
  query StoryData {
    allUiVersion(sort: { fields: commitDate, order: DESC }) {
      nodes {
        commitHash
        commitDate
        version
        uiStories {
          storyName
          dirName
          filePath
          storyItems {
            iframeName
            label
            name
          }
        }
      }
    }
  }
`

export const ComponentStory: FC<Props> = ({ name, dirName }) => {
  const { allUiVersion } = useStaticQuery<Queries.StoryDataQuery>(query)

  // package.jsonにあるsmarthr-uiのバージョンをデフォルトにする
  const defaultVersion = allUiVersion.nodes.find((node) => node.version === packageInfo.version)
  // 全Storyのデータからpropsで指定された名前のStoryを取得する
  const defaultData = defaultVersion?.uiStories?.find((story) => {
    if (dirName) return story?.dirName === dirName && story?.storyName === name
    return story?.storyName === name
  })

  // コードはクライアント側でfetchするため初期値は空文字列
  const [storyData, setStoryData] = useState({
    code: '',
    storyItems: defaultData?.storyItems ?? [],
    sourcePath: defaultData?.filePath?.replace(/^\.\//, '').replace(/[^/]*?\.tsx$/, '') || '',
  })

  // プルダウンの選択肢を作成する
  const versionOptions =
    allUiVersion.nodes?.map((version) => ({
        label: `v${version.version}`,
        value: version.version ?? '',
      })) ?? []

  const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false)
  const [isStoryLoaded, setIsStoryLoaded] = useState<boolean>(false)
  const [currentIFrame, setCurrentIFrame] = useState<string>(storyData.storyItems[0]?.iframeName ?? '')
  const [displayVersion, setDisplayVersion] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)

  const fetchData = useCallback(
    async (version: string) => {
      setDisplayVersion(version)
      setIsStoryLoaded(false)
      setIsIFrameLoaded(false)

      // GraphQLからで取得したデータから該当のバージョンを選ぶ
      const versionData = allUiVersion.nodes.find((node) => node.version === version)
      // 該当のバージョンからページで表示したいStoryを選ぶ
      const targetStoryData = versionData?.uiStories?.find((story) => story?.storyName === name)
      if (!versionData || !targetStoryData) {
        setShowError(true)
        return
      }

      // コードはGitHubからfetchする
      let code = ''
      try {
        const codeRes = await fetch(`${SHRUI_GITHUB_RAW}v${version}/${targetStoryData.filePath}`)
        code = await codeRes.text()
      } catch (error) {
        setShowError(true)
        return
      }

      const storyItems = targetStoryData.storyItems || []
      const sourcePath = targetStoryData.filePath?.replace(/^\.\//, '').replace(/[^/]*?\.tsx$/, '') || ''

      setStoryData({ code, storyItems, sourcePath })
      setCurrentIFrame(storyItems[0]?.iframeName ?? '')
      setShowError(false)
    },
    [name, allUiVersion.nodes],
  )

  const getCommitHash = useCallback(() => (
      allUiVersion.nodes?.find((version) => version.version === displayVersion)?.commitHash ?? ''
    ), [allUiVersion.nodes, displayVersion])

  // クエリ付きURLでアクセスされた場合
  const location = useLocation()
  useEffect(() => {
    const { search } = location
    const params = new URLSearchParams(search)
    const version = params.get('v') || packageInfo.version
    if (version === displayVersion) return

    fetchData(version)
  }, [location, displayVersion, fetchData])

  const onChangeVersion = (version: string) => {
    navigate(`?v=${encodeURI(version)}`)
  }

  const onClickTab = (itemId: string): void => {
    if (itemId === currentIFrame) return

    setIsIFrameLoaded(false)
    setCurrentIFrame(itemId)
    return
  }

  const getStoryName = (currentName: string) => storyData.storyItems?.find((item) => item?.iframeName === currentName)?.iframeName

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
                versionOptions.find((option) => option.value === displayVersion)
                  ? '-'
                  : `v${displayVersion}`,
            }}
            error={showError}
          />
        </Cluster>
        <Cluster>
          <AnchorButton
            href={`https://${getCommitHash()}--${SHRUI_CHROMATIC_ID}.chromatic.com/?path=/story/${getStoryName(
              storyData?.storyItems[0]?.iframeName ?? '',
            )}`}
            target="_blank"
            size="s"
            suffix={<FaExternalLinkAltIcon />}
            rel="noreferrer"
          >
            Storybook
          </AnchorButton>
          <AnchorButton
            href={`${SHRUI_GITHUB_PATH}v${displayVersion}/${storyData?.sourcePath}`}
            target="_blank"
            size="s"
            suffix={<FaExternalLinkAltIcon />}
            rel="noreferrer"
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
            {storyData.storyItems.map((item, index: number) => (
                <TabItem
                  id={item?.iframeName ?? ''}
                  key={index}
                  onClick={onClickTab}
                  selected={item?.iframeName === currentIFrame}
                >
                  {item?.label}
                </TabItem>
              ))}
          </Tab>
          {currentIFrame !== '' && (
            <>
              <LinkWrapper>
                <TextLink
                  href={`https://${getCommitHash()}--${SHRUI_CHROMATIC_ID}.chromatic.com/iframe.html?id=${getStoryName(
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
                    storyData.storyItems.find((item) => item?.name === currentIFrame)?.label || ''
                  }
                  src={`https://${getCommitHash()}--${SHRUI_CHROMATIC_ID}.chromatic.com/iframe.html?id=${getStoryName(
                    currentIFrame,
                  )}`}
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
