'use client';

import { IntlProvider, ResponseMessage as SHRUIResponseMessage } from 'smarthr-ui';

import type { ComponentProps, FC } from 'react';

// NOTE: smarthr-ui v99.8.0 以降、ResponseMessage のアイコンが代替テキストのために useIntl を使うようになったため、
// MDX や .astro から直接描画する場合はこちらを使ってください
export const ResponseMessage: FC<ComponentProps<typeof SHRUIResponseMessage>> = (props) => (
  <IntlProvider locale="ja">
    <SHRUIResponseMessage {...props} />
  </IntlProvider>
);
