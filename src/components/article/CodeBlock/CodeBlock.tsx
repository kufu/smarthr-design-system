import { PATTERNS_STORYBOOK_URL } from '@Constants/application'
import { CSS_COLOR } from '@Constants/style'
import { Script } from 'gatsby'
import Highlight, { Language, defaultProps } from 'prism-react-renderer'
import github from 'prism-react-renderer/themes/github'
import vscode from 'prism-react-renderer/themes/vsDark'
import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider, LiveProviderProps } from 'react-live'
import * as ui from 'smarthr-ui'
import { Gap, SeparateGap } from 'smarthr-ui/lib/components/Layout/type'
import styled, { ThemeProvider, css } from 'styled-components'
// TODO SmartHR な Dark テーマほしいな!!!

import { ComponentPreview } from '../../ComponentPreview'

import { CopyButton } from './CopyButton'

type Props = {
  children: string
  className?: Language
  editable?: boolean
  isStorybook?: boolean
  withStyled?: boolean
  renderingComponent?: string
  componentTitle?: string
} & Pick<LiveProviderProps, 'scope'> & {
    gap?: Gap | SeparateGap
    align?: CSSProperties['alignItems']
    layout?: 'none' | 'product'
  }

const theme = {
  ...github,
  ...{
    plain: {
      backgroundColor: CSS_COLOR.SEMANTICS_COLUMN,
    },
  },
}

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

export const CodeBlock: FC<Props> = ({
  children,
  className,
  editable = false,
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
  const language = className ? className.replace(/language-/, '') : ''
  // Storybookとのコード共通化のため、childrenで渡ってくるコードには`render()`が含まれていない。LivePreviewでコンポーネントのレンダリングが必要な場合には、末尾に追加する。

  const renderingPropsText = Object.keys(componentProps)
    .map((key) => {
      return `${key}="${componentProps[key as keyof typeof componentProps]}"`
    })
    .join(' ')

  const code = renderingComponent
    ? `${children.trim()}\nrender(<${renderingComponent} ${renderingPropsText} />)`
    : children.trim()
  const TextLink = ui.TextLink
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
        <ThemeProvider theme={smarthrTheme}>
          {/* ライブエディタ内のコードのトランスパイルに使用するTS（容量が大きいためCDNを利用） */}
          <Script src="https://unpkg.com/typescript@latest/lib/typescript.js" onLoad={() => setTsLoaded(true)} />
          {tsLoaded && (
            <LiveProvider
              code={code}
              language={language as Language}
              scope={{ ...React, ...ui, styled, css, ...scope }}
              theme={{
                ...vscode,
                plain: {
                  color: CSS_COLOR.LIGHT_GREY_3,
                  backgroundColor: CSS_COLOR.TEXT_BLACK,
                },
              }}
              noInline={withStyled}
              transformCode={transformCode}
            >
              <ComponentPreview gap={gap} align={align} layout={layout}>
                {/* @ts-ignore -- LivePreviewの型定義が正しくないようなので、エラーを無視。https://github.com/FormidableLabs/react-live/pull/304 */}
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
      </Wrapper>
    )
  }

  return (
    <Highlight {...defaultProps} code={code} language={language as Language} theme={isStorybook ? vscode : theme}>
      {({ style, tokens, getLineProps, getTokenProps }): ReactNode => (
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
