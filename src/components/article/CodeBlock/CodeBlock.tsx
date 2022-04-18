import React, { ReactNode, VFC } from 'react'
import styled from 'styled-components'
import Highlight, { Language, defaultProps } from 'prism-react-renderer'
import github from 'prism-react-renderer/themes/github'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { ComponentPreview } from '../../ComponentPreview'
import * as ui from 'smarthr-ui'
import { CSS_COLOR } from '../../../constants/style'
import { CopyButton } from './CopyButton'

type Props = {
  children: string
  className?: Language
  live: boolean
}

const theme = {
  ...github,
  ...{
    plain: {
      backgroundColor: CSS_COLOR.SEMANTICS_COLUMN,
    },
  },
}

export const CodeBlock: VFC<Props> = ({ children, className, live }) => {
  const language = className ? className.replace(/language-/, '') : ''
  const code = children.trim()

  if (live) {
    return (
      <Wrapper>
        <LiveProvider code={code} scope={ui} theme={theme}>
          <ComponentPreview>
            <LivePreview />
          </ComponentPreview>
          <StyledLiveEditorContainer>
            <CopyButton text={code} />
            <LiveEditor />
            <LiveError />
          </StyledLiveEditorContainer>
        </LiveProvider>
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

const PreContainer = styled.pre`
  position: relative;
  margin-block: 16px 0;
  padding: 3.25rem 1.5rem 1.5rem;
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
  margin: 0;
  border-width: 0 1px 1px;
`
