import { Table as SHRUITable } from 'smarthr-ui';

import styles from './index.module.scss';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Table({ children }: Props) {
  return <SHRUITable className={styles.tableReel}>{children}</SHRUITable>;
}
