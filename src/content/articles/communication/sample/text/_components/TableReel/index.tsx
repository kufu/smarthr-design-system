import { IntlProvider, TableReel as OriginalTableReel } from 'smarthr-ui';

import styles from './index.module.scss';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function TableReel({ children }: Props) {
  return (
    <IntlProvider locale="ja">
      <OriginalTableReel className={styles.tableReel}>{children}</OriginalTableReel>
    </IntlProvider>
  );
}
