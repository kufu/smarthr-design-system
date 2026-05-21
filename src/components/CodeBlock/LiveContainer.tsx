import { themes } from 'prism-react-renderer';
// eslint-disable-next-line no-restricted-imports
import React, { type RefCallback, useId, useState } from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { CssBaseLine } from 'smarthr-normalize-css';
import * as ui from 'smarthr-ui';
import styled, { StyleSheetManager, ThemeProvider, css } from 'styled-components';

import { CSS_COLOR } from '@/constants/style';

import ComponentPreview from '../ComponentPreview/ComponentPreview';

import CopyButton from './CopyButton';
import styles from './LiveContainer.module.scss';
import sharedStyles from './shared.module.scss';

import type { LiveContainerProps } from './types';

type Props = LiveContainerProps;

const smarthrTheme = ui.createTheme();

const transformCode = (snippet: string) =>
  // Storybookでも利用するため、コード内に`import`・`export`が記述されているが、ここではエラーになるので削除する。
  snippet.replace(/^import\s.*\sfrom\s.*$/gm, '').replace(/^export\s/gm, '');
export default function LiveContainer({ code, language, scope, noIframe, withStyled, background, canvas, hideCode }: Props) {
  const id = useId();
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
    }, 2000);
  };

  return (
    <ThemeProvider theme={smarthrTheme}>
      <LiveProvider
        code={code}
        language={language}
        scope={{ ...React, ...ui, ...scope, styled, css }}
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
                  <ComponentPreview background={background} canvas={canvas}>
                    <CssBaseLine />
                    <LivePreview Component={React.Fragment} />
                  </ComponentPreview>
                </StyleSheetManager>
              )}
            </FrameContextConsumer>
          </Frame>
        ) : (
          <ComponentPreview background={background} canvas={canvas}>
            <LivePreview Component={React.Fragment} />
          </ComponentPreview>
        )}
        <div
          style={{
            backgroundColor: '#f8f7f6',
            display: hideCode ? 'flex' : 'none',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <ui.DisclosureTrigger targetId={id}>
            {({ expanded }) => (
              <ui.Button variant="tertiary" size="S">
                {expanded ? 'コードを折りたたむ' : 'コードを表示'}
              </ui.Button>
            )}
          </ui.DisclosureTrigger>
        </div>
        <ui.DisclosureContent id={id} isOpen={hideCode === true ? undefined : true}>
          <div className={styles.codeWrapper}>
            <div className={styles.liveEditorContainer}>
              <div>
                <div className={sharedStyles.preContainer}>
                  <CopyButton text={code || ''} />
                  {/* @ts-expect-error -- LiveEditorの型定義が正しくないようなので、エラーを無視。 https://github.com/FormidableLabs/react-live/pull/234 */}
                  <LiveEditor padding={0} />
                </div>
              </div>
            </div>
          </div>
          <LiveError />
        </ui.DisclosureContent>
      </LiveProvider>
    </ThemeProvider>
  );
}
