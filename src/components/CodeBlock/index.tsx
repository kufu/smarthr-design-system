import React, { type CSSProperties } from 'react';
import clsx from 'clsx';
// TODO SmartHR な Dark テーマほしいな!!!
import { Highlight, themes } from 'prism-react-renderer';
import type { LiveProvider } from 'react-live';
import * as ui from 'smarthr-ui';
import type { Gap, SeparateGap } from 'smarthr-ui/lib/types';
import { PATTERNS_STORYBOOK_URL } from '@/constants/application';
import { CSS_COLOR } from '@/constants/style';
import styles from './index.module.scss';
import sharedStyles from './shared.module.scss';
import CopyButton from './CopyButton';
import LiveContainer from './LiveContainer';

type LiveProviderProps = React.ComponentProps<typeof LiveProvider>;

export type LiveContainerProps = {
  code?: string;
  language?: string;
  withStyled?: boolean;
  /**
   * @deprecated noIframe は非推奨です。iframeが原因で表示が崩れるなどやむを得ない場合のみ使用してください。
   */
  noIframe?: boolean;
} & Pick<LiveProviderProps, 'scope'> & {
    gap?: Gap | SeparateGap;
    align?: CSSProperties['alignItems'];
    layout?: 'none' | 'product';
  };

type Props = {
  className?: string;
  editable?: boolean;
  isStorybook?: boolean;
  renderingComponent?: string;
  componentTitle?: string;
} & LiveContainerProps;

const theme = {
  ...themes.github,
  ...{
    plain: {
      backgroundColor: CSS_COLOR.SEMANTICS_COLUMN,
    },
  },
};

export default function CodeBlock({
  className,
  editable = false,
  noIframe = false,
  isStorybook = false,
  scope,
  withStyled = false,
  renderingComponent,
  componentTitle,
  gap,
  align,
  layout,
  code,
  language,
  ...componentProps // 残りのpropsはLivePreviewするコンポーネントに渡す
}: Props) {
  // Storybookとのコード共通化のため、childrenで渡ってくるコードには`render()`が含まれていない。LivePreviewでコンポーネントのレンダリングが必要な場合には、末尾に追加する。

  const renderingPropsText = Object.keys(componentProps)
    .map((key) => `${key}="${componentProps[key as keyof typeof componentProps]}"`)
    .join(' ');

  const rawCode = code || '';
  const codeString = renderingComponent ? `${rawCode}\nrender(<${renderingComponent} ${renderingPropsText} />)` : rawCode.trim();

  const TextLink = ui.TextLink;

  if (editable) {
    return (
      <div className={styles.wrapper}>
        {renderingComponent && (
          <div className={styles.linkWrapper}>
            <TextLink href={`${PATTERNS_STORYBOOK_URL}?path=/story/${componentTitle}/`} target="_blank">
              別画面で開く
            </TextLink>
          </div>
        )}
        <LiveContainer
          code={codeString}
          language={language}
          withStyled={withStyled}
          noIframe={noIframe}
          gap={gap}
          align={align}
          layout={layout}
        />
      </div>
    );
  }

  return (
    <Highlight code={codeString} language={language ?? ''} theme={isStorybook ? themes.vsDark : theme}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <div className={styles.codeWrapper}>
          <div className={clsx(sharedStyles.preContainer, isStorybook && sharedStyles.preContainerStorybook)}>
            <CopyButton text={codeString} />
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })} key={i}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} key={key} />
                  ))}
                </div>
              ))}
            </pre>
          </div>
        </div>
      )}
    </Highlight>
  );
}
