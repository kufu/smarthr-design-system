import { CSS_COLOR } from '@Constants/style'
import { Script } from 'gatsby'
import { themes } from 'prism-react-renderer'
import React, { FC } from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { CssBaseLine } from 'smarthr-normalize-css'
import * as ui from 'smarthr-ui'
import styled, { ThemeProvider, css } from 'styled-components'
// TODO SmartHR な Dark テーマほしいな!!!

import { ComponentPreview } from '../../ComponentPreview'

import { PreContainer } from './CodeBlock'
import { CopyButton } from './CopyButton'

import type { LiveContainerProps } from './CodeBlock'

type Props = {
  tsLoaded: boolean
  setTsLoaded: React.Dispatch<React.SetStateAction<boolean>>
} & LiveContainerProps

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

export const LiveContainer: FC<Props> = ({
  code,
  language,
  scope,
  noIframe,
  withStyled,
  gap,
  align,
  layout,
  tsLoaded,
  setTsLoaded,
}) => (
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
        <ComponentPreview gap={gap} align={align} layout={layout}>
          {!noIframe && <CssBaseLine />}
          <LivePreview Component={React.Fragment} />
        </ComponentPreview>
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
