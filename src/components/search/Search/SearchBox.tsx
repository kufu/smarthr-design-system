import { liteClient } from 'algoliasearch/lite';
import React, { useEffect, useState } from 'react';
import { Hits, InstantSearch, type UseSearchBoxProps, useSearchBox } from 'react-instantsearch';
import { FaSearchIcon, Input } from 'smarthr-ui';

import HitComponent from './HitComponent';
import styles from './SearchBox.module.scss';
import SearchResultOuter from './SearchResultOuter';

type Props = {
  isAvailable: boolean;
};

function CustomSearchBox({ isAvailable, ...props }: UseSearchBoxProps & Props) {
  const { refine } = useSearchBox(props);
  const [searchState, setSearchState] = useState<string | undefined>();
  const { search } = window.location;

  // クエリ付きURLでアクセスされた場合
  useEffect(() => {
    const params = new URLSearchParams(search);
    const query = params.get('query');

    if (query && searchState === undefined) {
      setSearchState(query);
    }
  }, [search, searchState]);

  // テキスト入力による検索
  const onSearchStateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const url = new URL(window.location.href);

    const searchQuery = event.target.value;
    url.searchParams.set('query', searchQuery);
    window.history.pushState({}, '', url);

    setSearchState(searchQuery);
  };

  useEffect(() => {
    if (searchState) {
      refine(searchState);
    }
  }, [searchState, refine]);

  return (
    <>
      {/* 検索インプット部分 */}
      <div className={styles.inputOuter}>
        <p id="desc-for-search-input">例：Button、画面キャプチャ、用字用語、須磨英知など</p>
        {/* eslint-disable-next-line smarthr/a11y-input-in-form-control */}
        <Input
          width="100%"
          prefix={<FaSearchIcon className={styles.searchIcon} aria-label="検索" />}
          value={searchState ?? ''}
          onChange={onSearchStateChange}
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
          aria-labelledby="label-for-search-input"
          aria-describedby="desc-for-search-input"
          name="query"
        />
        {!isAvailable && searchState && (
          <div className={styles.warningMessage}>検索処理を実行するにはAlgoliaのAPIキーの設定が必要です</div>
        )}
      </div>
      {/* 検索結果 */}
      {searchState && (
        <SearchResultOuter>
          <Hits hitComponent={HitComponent} />
        </SearchResultOuter>
      )}
    </>
  );
}

const searchClient = liteClient(import.meta.env.PUBLIC_ALGOLIA_APP_ID || '', import.meta.env.PUBLIC_ALGOLIA_SEARCH_API_KEY || '');

export default function SearchBox(props: Props) {
  return (
    <InstantSearch
      indexName={import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME || ''}
      searchClient={searchClient}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      <CustomSearchBox {...props} />
    </InstantSearch>
  );
}
