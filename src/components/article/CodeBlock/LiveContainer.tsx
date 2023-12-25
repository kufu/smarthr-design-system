import { CSS_COLOR } from '@Constants/style'
import { Script } from 'gatsby'
import { themes } from 'prism-react-renderer'
import React, { FC, useEffect, useRef, useState } from 'react'
import Frame, { FrameContextConsumer } from 'react-frame-component'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { CssBaseLine } from 'smarthr-normalize-css'
import * as ui from 'smarthr-ui'
import styled, { StyleSheetManager, ThemeProvider, css } from 'styled-components'
import 'smarthr-ui/smarthr-ui.css'

import { ComponentPreview } from '../../ComponentPreview'

import { PreContainer } from './CodeBlock'
import { CopyButton } from './CopyButton'

import type { LiveContainerProps } from './CodeBlock'

type Props = LiveContainerProps

const smarthrTheme = ui.createTheme()

const transformCode = (snippet: string) => {
  if (window.ts === undefined) return '' // TSスクリプトロード後にライブエディタをレンダリングするので、ここには入らないはず。

  // Storybookでも利用するため、コード内に`import`・`export`が記述されているが、ここではエラーになるので削除する。
  const code = snippet.replace(/^import\s.*\sfrom\s.*$/gm, '').replace(/^export\s/gm, '')
  return window.ts.transpile(code, {
    jsx: window.ts.JsxEmit.React,
    target: window.ts.ScriptTarget.ES2020,
  })
}

export const LiveContainer: FC<Props> = ({ code, language, scope, noIframe, withStyled, gap, align, layout }) => {
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
      if (height > 0) {
        setIframeHeight(height + 8) // ComponentPreviewコンポーネントに`margin-block-start: 8px`が指定されているため
      }
    }, 500)
  }, [tsLoaded])

  return (
    <ThemeProvider theme={smarthrTheme}>
      {/* ライブエディタ内のコードのトランスパイルに使用するTS（容量が大きいためCDNを利用） */}
      <Script src="https://unpkg.com/typescript@latest/lib/typescript.js" onLoad={() => setTsLoaded(true)} />
      {tsLoaded && (
        <LiveProvider
          code={code}
          language={language}
          scope={{ ...React, ...ui, styled, css, ...scope }}
          theme={{
            ...themes.vsDark,
            plain: {
              color: CSS_COLOR.LIGHT_GREY_3,
              backgroundColor: CSS_COLOR.TEXT_BLACK,
            },
          }}
          noInline={withStyled}
          transformCode={transformCode}
        >
          {/* smarthr-ui側が対応したらnoIframeの条件分岐は削除し、iframeのdocument.bodyをLiveEditorに渡してportalにする予定です。 */}
          {!noIframe && showFrame ? (
            <Frame
              ref={iframeRef}
              width="100%"
              height={`${iframeHeight}px`}
              style={{ border: 'none', overflow: 'hidden', display: 'block' }}
              referrerPolicy="same-origin"
              head={<link href="/smarthr-ui.css" rel="stylesheet" />}
            >
              <FrameContextConsumer>
                {({ document }) => (
                  <StyleSheetManager target={document?.head}>
                    <ComponentPreview gap={gap} align={align} layout={layout}>
                      <CssBaseLine />
                      <LivePreview Component={React.Fragment} />
                    </ComponentPreview>
                  </StyleSheetManager>
                )}
              </FrameContextConsumer>
            </Frame>
          ) : (
            <ComponentPreview gap={gap} align={align} layout={layout}>
              <LivePreview Component={React.Fragment} />
            </ComponentPreview>
          )}
          <CodeWrapper>
            <StyledLiveEditorContainer>
              <PreContainer>
                <CopyButton text={code || ''} />
                {/* @ts-ignore -- LiveEditorの型定義が正しくないようなので、エラーを無視。 https://github.com/FormidableLabs/react-live/pull/234 */}
                <LiveEditor padding={0} />
              </PreContainer>
            </StyledLiveEditorContainer>
          </CodeWrapper>
          <LiveError />
        </LiveProvider>
      )}
    </ThemeProvider>
  )
}

const CodeWrapper = styled.div`
  position: relative;

  /* bodyに指定があるが、Frame内には効かないので再指定 */
  line-height: 1.75;
  overflow-wrap: break-word;
`

const StyledLiveEditorContainer = styled.div`
  & > div {
    overflow: auto;
    margin-block: 0;

    /* LiveEditor内のpreにはpaddingの一括指定しかできないので親要素で設定 */
    padding: 2.75rem 1.5rem 1.5rem;
    border-width: 0 1px 1px;
    background-color: ${CSS_COLOR.TEXT_BLACK};
    max-height: 40em;
    pre {
      width: fit-content;
    }
  }
`
