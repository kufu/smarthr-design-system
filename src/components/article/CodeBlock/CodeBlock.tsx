import React, { CSSProperties, ReactNode, VFC } from 'react'
import styled, { ThemeProvider, css } from 'styled-components'
import Highlight, { Language, defaultProps } from 'prism-react-renderer'
import github from 'prism-react-renderer/themes/github'
// TODO SmartHR な Dark テーマほしいな!!!
import vscode from 'prism-react-renderer/themes/vsDark'
import { LiveEditor, LiveError, LivePreview, LiveProvider, LiveProviderProps } from 'react-live'
import ts, { transpile } from 'typescript'
import { ComponentPreview } from '../../ComponentPreview'
import * as ui from 'smarthr-ui'
import { SDS_STORYBOOK_IFRAME } from '@Constants/application'
import { CSS_COLOR } from '@Constants/style'
import { CopyButton } from './CopyButton'
import { Gap, SeparateGap } from 'smarthr-ui/lib/components/Layout/type'

type Props = {
  children: string
  className?: Language
  editable?: boolean
  withStyled?: boolean
  renderingComponent?: string
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
  // Storybookでも利用するため、コード内に`import`・`export`が記述されているが、ここではエラーになるので削除する。
  const code = snippet.replace(/^import\s.*\sfrom\s.*$/gm, '').replace(/^export\s/gm, '')
  return transpile(code, {
    jsx: ts.JsxEmit.React,
    target: ts.ScriptTarget.ES2020,
  })
}

export const CodeBlock: VFC<Props> = ({
  children,
  className,
  editable = false,
  scope,
  withStyled = false,
  renderingComponent,
  gap,
  align,
  layout,
}) => {
  const language = className ? className.replace(/language-/, '') : ''

  // Storybookとのコード共通化のため、childrenで渡ってくるコードには`render()`が含まれていない。LivePreviewでコンポーネントのレンダリングが必要な場合には、末尾に追加する。
  const code = renderingComponent ? `${children.trim()}\nrender(<${renderingComponent} />)` : children.trim()
  const TextLink = ui.TextLink
  if (editable) {
    return (
      <Wrapper>
        {renderingComponent && (
          <LinkWrapper>
            <TextLink href={`${SDS_STORYBOOK_IFRAME}?id=${renderingComponent.toLowerCase()}&viewMode=story`} target="_blank">
              別画面で開く
            </TextLink>
          </LinkWrapper>
        )}
        <ThemeProvider theme={smarthrTheme}>
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
            <StyledLiveEditorContainer>
              <CopyButton text={code} />
              {/* @ts-ignore -- LiveEditorの型定義が正しくないようなので、エラーを無視。 https://github.com/FormidableLabs/react-live/pull/234 */}
              <LiveEditor padding={0} />
            </StyledLiveEditorContainer>
            <LiveError />
          </LiveProvider>
        </ThemeProvider>
      </Wrapper>
    )
  }

  return (
    <Highlight {...defaultProps} code={code} language={language as Language} theme={theme}>
      {({ style, tokens, getLineProps, getTokenProps }): ReactNode => (
        <PreContainer>
          <CopyButton text={code} />
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        </PreContainer>
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

const PreContainer = styled.pre`
  position: relative;
  margin-block: 16px 0;
  padding: 2.75rem 1.5rem 1.5rem;
  border: 1px solid ${CSS_COLOR.SEMANTICS_BORDER};
  background-color: ${CSS_COLOR.SEMANTICS_COLUMN};

  & > button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }

  /* pre内のコードやLiveEditorのtextareaなどの文字を強制的に折り返すようにする */
  * {
    word-break: break-all;
  }
`

const StyledLiveEditorContainer = styled(PreContainer)`
  overflow: auto;
  margin: 0;
  border-width: 0 1px 1px;
  background-color: ${CSS_COLOR.TEXT_BLACK};
  max-height: 40em;
`
