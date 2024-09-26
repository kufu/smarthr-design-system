import { CSS_COLOR } from '@/constants/style';
import { themes } from 'prism-react-renderer';
import React, { type FC, type RefCallback, useState } from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { CssBaseLine } from 'smarthr-normalize-css';
import * as ui from 'smarthr-ui';
import 'smarthr-ui/smarthr-ui.css';
import styled, { StyleSheetManager, ThemeProvider, css } from 'styled-components';

import { ComponentPreview } from '../../ComponentPreview';
import { PreContainer } from './CodeBlock';
import type { LiveContainerProps } from './CodeBlock';
import { CopyButton } from './CopyButton';

type Props = LiveContainerProps;

const smarthrTheme = ui.createTheme();

const transformCode = (snippet: string) => {
  // Storybookでも利用するため、コード内に`import`・`export`が記述されているが、ここではエラーになるので削除する。
  return snippet.replace(/^import\s.*\sfrom\s.*$/gm, '').replace(/^export\s/gm, '');
};

export const LiveContainer: FC<Props> = ({ code, language, scope, noIframe, withStyled, gap, align, layout }) => {
  const [iframeHeight, setIframeHeight] = useState(600); // デフォルトの高さを設定

  // iframeの高さをコンテンツに合わせて変更する
  const handleIframeMounted: RefCallback<HTMLIFrameElement> = (current) => {
    const innerWindow = current?.contentWindow;

    if (!innerWindow) {
      return; // ここに該当することはないはず
    }

    // レンダリングが終わるのを待ってから高さを計算・セットする
    setTimeout(() => {
      const height = innerWindow.document.body.scrollHeight;
      if (height > 0) {
        setIframeHeight(height + 8); // ComponentPreviewコンポーネントに`margin-block-start: 8px`が指定されているため
      }
    }, 500);
  };

  return (
    <ThemeProvider theme={smarthrTheme}>
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
        enableTypeScript
      >
        {/* smarthr-ui側が対応したらnoIframeの条件分岐は削除し、iframeのdocument.bodyをLiveEditorに渡してportalにする予定です。 */}
        {!noIframe ? (
          <Frame
            ref={handleIframeMounted}
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
    </ThemeProvider>
  );
};

const CodeWrapper = styled.div`
  position: relative;

  /* bodyに指定があるが、Frame内には効かないので再指定 */
  line-height: 1.75;
  overflow-wrap: break-word;
`;

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
`;
