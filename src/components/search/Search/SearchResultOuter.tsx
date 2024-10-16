import { useInstantSearch } from 'react-instantsearch-core';
import { Base } from 'smarthr-ui';

import styles from './SearchResultOuter.module.scss';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function SearchResultOuter({ children }: Props) {
  const {
    results: { hits },
  } = useInstantSearch();

  const hasResults = hits.length > 0;

  return (
    <Base className={styles.searchPanel}>
      <div className={styles.searchPanelHeader}>検索結果</div>
      <div className={styles.searchPanelBody}>
        {hasResults ? (
          <>
            <p>{hits.length}件がヒットしました。</p>
            <div className={styles.children}>{children}</div>
          </>
        ) : (
          <p>検索結果は見つかりませんでした。</p>
        )}
      </div>
    </Base>
  );
}
