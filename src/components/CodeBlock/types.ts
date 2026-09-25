import type { ComponentPreviewProps } from '../ComponentPreview/ComponentPreview';
import type { LiveProvider } from 'react-live';

type LiveProviderProps = React.ComponentProps<typeof LiveProvider>;

export type LiveContainerProps = {
  code?: string;
  hideCode?: boolean;
  language?: string;
  withStyled?: boolean;
  /**
   * @deprecated noIframe は非推奨です。iframeが原因で表示が崩れるなどやむを得ない場合のみ使用してください。
   */
  noIframe?: boolean;
} & Pick<LiveProviderProps, 'scope'> & {
    background?: ComponentPreviewProps['background'];
    canvas?: ComponentPreviewProps['canvas'];
  };

/**
 * CodeBlock / LiveContainer の内部実装で使う型。
 * noIframe は利用者向けに非推奨（`@deprecated`）だが、内部での props 受け渡しで
 * deprecation の警告が出ないよう、マーカーを外した noIframe を持たせている。
 */
export type LiveContainerInternalProps = Omit<LiveContainerProps, 'noIframe'> & {
  noIframe?: boolean;
};
