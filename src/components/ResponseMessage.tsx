import { IntlProvider, ResponseMessage as SHRUIResponseMessage } from 'smarthr-ui';

import type { ComponentProps, FC } from 'react';

// smarthr-ui v99.8.0 以降、ResponseMessage のアイコンが代替テキストのために useIntl を使う。
// MDX や .astro から直接描画する場合は、別 React ツリーになるため IntlProvider で包んだこちらを使う。
export const ResponseMessage: FC<ComponentProps<typeof SHRUIResponseMessage>> = (props) => (
  <IntlProvider locale="ja">
    <SHRUIResponseMessage {...props} />
  </IntlProvider>
);
