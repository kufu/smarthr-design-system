import { PATTERNS_STORYBOOK_URL } from '@Constants/application'
import { CSS_COLOR } from '@Constants/style'
import { Highlight, themes } from 'prism-react-renderer'
import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import Frame, { FrameContextConsumer } from 'react-frame-component'
import * as ui from 'smarthr-ui'
import { Gap, SeparateGap } from 'smarthr-ui/lib/types'
import styled, { StyleSheetManager } from 'styled-components'
// TODO SmartHR な Dark テーマほしいな!!!

import { CopyButton } from './CopyButton'
import { LiveContainer } from './LiveContainer'

import type { LiveProvider } from 'react-live'

type LiveProviderProps = React.ComponentProps<typeof LiveProvider>

export type LiveContainerProps = {
  code?: string
  language?: string
  withStyled?: boolean
  /**
   * @deprecated noIframe は非推奨です。iframeが原因で表示が崩れるなどやむを得ない場合のみ使用してください。
   */
  noIframe?: boolean
} & Pick<LiveProviderProps, 'scope'> & {
    gap?: Gap | SeparateGap
    align?: CSSProperties['alignItems']
    layout?: 'none' | 'product'
  }

type Props = {
  children: string
  className?: string
  editable?: boolean
  isStorybook?: boolean
  renderingComponent?: string
  componentTitle?: string
} & LiveContainerProps

const theme = {
  ...themes.github,
  ...{
    plain: {
      backgroundColor: CSS_COLOR.SEMANTICS_COLUMN,
    },
  },
}

export const CodeBlock: FC<Props> = ({
  children,
  className,
  editable = false,
  noIframe = false,
  isStorybook = false,
  scope,
  withStyled = false,
  renderingComponent,
  componentTitle,
  gap,
  align,
  layout,
  ...componentProps // 残りのpropsはLivePreviewするコンポーネントに渡す
}) => {
  const [tsLoaded, setTsLoaded] = useState(false)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeHeight, setIframeHeight] = useState(600) // デフォルトの高さを設定

  // Gatsbyではページロード時に<Frame>がレンダリングされないため、クライアントで表示をトリガーする
  // https://github.com/ryanseddon/react-frame-component/issues/192#issuecomment-1153078390
  const [showFrame, setShowFrame] = useState(false)
  useEffect(() => {
    setShowFrame(true)
  }, [])

  // iframeの高さをコンテンツに合わせて変更する
  useEffect(() => {
    if (!tsLoaded) return // CDNからのTSスクリプトのロード後に描画されるので、それまでは高さを計算しない
    const innerWindow = iframeRef.current?.contentWindow
    if (!innerWindow) return // ここに該当することはないはず

    // TSスクリプトロード後、レンダリングが終わるのを待ってから高さを計算・セットする
    setTimeout(() => {
      const height = innerWindow.document.body.scrollHeight
      console.log(height)
      if (height > 0) {
        setIframeHeight(height + 9) // ComponentPreviewコンポーネントに`margin-block-start: 8px`が指定されているため・高さが小数点以下の精度の場合があるため
      }
    }, 500)
  }, [tsLoaded])

  const language = className ? className.replace(/language-/, '') : ''
  // Storybookとのコード共通化のため、childrenで渡ってくるコードには`render()`が含まれていない。LivePreviewでコンポーネントのレンダリングが必要な場合には、末尾に追加する。

  const renderingPropsText = Object.keys(componentProps)
    .map((key) => `${key}="${componentProps[key as keyof typeof componentProps]}"`)
    .join(' ')

  const code = renderingComponent
    ? `${children.trim()}\nrender(<${renderingComponent} ${renderingPropsText} />)`
    : children.trim()
  const TextLink = ui.TextLink

  const LiveContainerComponent = () => (
    <LiveContainer
      code={code}
      language={language}
      withStyled={withStyled}
      noIframe={noIframe}
      tsLoaded={tsLoaded}
      setTsLoaded={setTsLoaded}
      gap={gap}
      align={align}
      layout={layout}
    />
  )

  if (editable) {
    return (
      <Wrapper>
        {renderingComponent && (
          <LinkWrapper>
            <TextLink href={`${PATTERNS_STORYBOOK_URL}?path=/story/${componentTitle}/`} target="_blank">
              別画面で開く
            </TextLink>
          </LinkWrapper>
        )}
        {!noIframe && showFrame && (
          <Frame
            ref={iframeRef}
            width="100%"
            height={`${iframeHeight}px`}
            style={{ border: 'none', overflow: 'hidden' }}
            referrerPolicy="same-origin"
          >
            <FrameContextConsumer>
              {({ document }) => <StyleSheetManager target={document?.head}>{LiveContainerComponent()}</StyleSheetManager>}
            </FrameContextConsumer>
          </Frame>
        )}
        {/* smarthr-ui側が対応したら以下は削除し、iframeのdocument.bodyをLiveEditorに渡してportalにする予定です。 */}
        {noIframe && LiveContainerComponent()}
      </Wrapper>
    )
  }

  return (
    <Highlight code={code} language={language} theme={isStorybook ? themes.vsDark : theme}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <CodeWrapper>
          <PreContainer isStorybook={isStorybook}>
            <CopyButton text={code} />
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })} key={i}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} key={key} />
                  ))}
                </div>
              ))}
            </pre>
          </PreContainer>
        </CodeWrapper>
      )}
    </Highlight>
  )
}

const Wrapper = styled.div`
  margin-block: 16px 0;
`

const LinkWrapper = styled.div`
  font-size: 0.8rem;
  text-align: right;
`

const CodeWrapper = styled.div`
  position: relative;
`

const PreContainer = styled.div<{ isStorybook?: boolean }>`
  font-family: monospace;
  margin-block: 16px 0;
  border: 1px solid ${CSS_COLOR.SEMANTICS_BORDER};
  background-color: ${CSS_COLOR.LIGHT_GREY_3};
  overflow-x: scroll;

  & > button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }

  /* preのデフォルトは display: block; で幅100%になるが、100%を超えられるように上書き(祖先要素には横スクロールを適用) */
  pre {
    width: max-content;
    min-width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 2.75rem 1.5rem 1.5rem;
    box-sizing: border-box;
  }

  /* LiveEditor内で preに white-space: pre-wrap; が適用されているため、文字を強制的に折り返すようにする */
  * {
    word-break: break-all;
  }

  ${({ isStorybook }) =>
    isStorybook &&
    `
      margin: 0;
      height: 300px;
      border: 0;
      overflow: scroll;
      resize: vertical;
    `};
`

export { PreContainer }
