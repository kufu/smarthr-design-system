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
