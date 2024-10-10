import React, { type RefCallback, useState } from 'react';
import { themes } from 'prism-react-renderer';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { CssBaseLine } from 'smarthr-normalize-css';
import * as ui from 'smarthr-ui';
import styled, { StyleSheetManager, ThemeProvider, css } from 'styled-components';
import { CSS_COLOR } from '@/constants/style';
import styles from './LiveContainer.module.scss';
import sharedStyles from './shared.module.scss';
import type { LiveContainerProps } from './';
import ComponentPreview from './ComponentPreview';
import CopyButton from './CopyButton';

type Props = LiveContainerProps;

const smarthrTheme = ui.createTheme();

const transformCode = (snippet: string) => {
  // Storybookでも利用するため、コード内に`import`・`export`が記述されているが、ここではエラーになるので削除する。
  return snippet.replace(/^import\s.*\sfrom\s.*$/gm, '').replace(/^export\s/gm, '');
};

export default function LiveContainer({ code, language, scope, noIframe, withStyled, gap, align, layout }: Props) {
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
        <div className={styles.codeWrapper}>
          <div className={styles.liveEditorContainer}>
            <div className={sharedStyles.preContainer}>
              <CopyButton text={code || ''} />
              {/* @ts-ignore -- LiveEditorの型定義が正しくないようなので、エラーを無視。 https://github.com/FormidableLabs/react-live/pull/234 */}
              <LiveEditor padding={0} />
            </div>
          </div>
        </div>
        <LiveError />
      </LiveProvider>
    </ThemeProvider>
  );
}
