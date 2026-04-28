import type { CSSProperties } from 'react';
import type { LiveProvider } from 'react-live';
import type { Gap, SeparateGap } from 'smarthr-ui/types';

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
