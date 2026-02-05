'use client';

import { IntlProvider, OpenInNewTabIcon as SHRUIOpenInNewTabIcon } from 'smarthr-ui';

import type { FC } from 'react';

export const OpenInNewTabIcon: FC = () => (
  <IntlProvider locale="ja">
    <SHRUIOpenInNewTabIcon />
  </IntlProvider>
);
