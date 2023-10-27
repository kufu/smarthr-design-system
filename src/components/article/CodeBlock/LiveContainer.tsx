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
  withIframe,
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
          {withIframe && <CssBaseLine />}
          <LivePreview Component={React.Fragment} />
        </ComponentPreview>
        <CodeWrapper>
          <StyledLiveEditorContainer>
            <CopyButton text={code} />
            {/* @ts-ignore -- LiveEditorの型定義が正しくないようなので、エラーを無視。 https://github.com/FormidableLabs/react-live/pull/234 */}
            <LiveEditor padding={0} />
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

const StyledLiveEditorContainer = styled(PreContainer)`
  overflow: auto;
  margin: 0;

  /* LiveEditor内のpreにはpaddingの一括指定しかできないので親要素で設定 */
  padding: 2.75rem 1.5rem 1.5rem;
  border-width: 0 1px 1px;
  background-color: ${CSS_COLOR.TEXT_BLACK};
  max-height: 40em;
  pre {
    width: fit-content;
  }
`
