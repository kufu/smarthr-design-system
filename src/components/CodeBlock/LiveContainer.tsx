import { themes } from 'prism-react-renderer';
// eslint-disable-next-line no-restricted-imports
import React, { useEffect, useId, useRef, useState } from 'react';
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // iframe内のResizeObserverを設定
  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    // iframe の内容が完全にロードされるまで待つ
    const setupResizeObserver = () => {
      const innerWindow = iframe.contentWindow;

      if (!innerWindow?.document?.body) {
        // body がまだ存在しない場合は、少し待ってから再試行
        timeoutId = setTimeout(setupResizeObserver, 50);
        return;
      }

      // ResizeObserverでbody要素のサイズ変化を監視
      resizeObserverRef.current = new ResizeObserver(() => {
        const height = innerWindow.document.body.scrollHeight;
        if (height <= 0) {
          return;
        }

        const newHeight = height + 8;
        // state を使わず、直接 iframe の高さを更新（再レンダリングを避ける）
        if (iframe && iframe.style) {
          iframe.style.height = `${newHeight}px`;
        }
      });

      // body要素を監視対象に追加
      resizeObserverRef.current.observe(innerWindow.document.body);

      // 初期高さの計算
      const initialHeight = innerWindow.document.body.scrollHeight;
      if (initialHeight > 0) {
        const newHeight = initialHeight + 8;
        if (iframe && iframe.style) {
          iframe.style.height = `${newHeight}px`;
        }
      }
    };

    // iframe の内容がレンダリングされるのを待つ
    timeoutId = setTimeout(setupResizeObserver, 50);

    // クリーンアップ
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
    };
  }, []); // 一度だけ設定（ResizeObserverは自動的にサイズ変化を検知し続ける）

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
            ref={iframeRef}
            width="100%"
            height="600px"
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
