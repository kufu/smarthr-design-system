import { CSS_COLOR, CSS_FONT_SIZE } from '@Constants/style'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { Hits, connectSearchBox } from 'react-instantsearch-dom'
import { FaSearchIcon, Input } from 'smarthr-ui'
import styled from 'styled-components'

import { HitComponent } from './HitComponent'
import { SearchResultOuter } from './SearchResultOuter'

import type { FC } from 'react'
import type { SearchBoxProvided } from 'react-instantsearch-core'

type Props = { isAvailable: boolean }

const SearchBox: FC<SearchBoxProvided & Props> = ({ refine, isAvailable }) => {
  const [searchState, setSearchState] = useState<string | undefined>()

  // クエリ付きURLでアクセスされた場合
  const location = useLocation()
  useEffect(() => {
    const { search } = location
    const params = new URLSearchParams(search)
    const query = params.get('query')

    if (query && searchState === undefined) setSearchState(query)
  }, [location, searchState])

  // テキスト入力による検索
  const onSearchStateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchQuery = event.target.value

    navigate(`?query=${encodeURI(searchQuery)}`)
    setSearchState(searchQuery)
  }

  useEffect(() => {
    refine(searchState)
  }, [searchState, refine])

  return (
    <>
      {/* 検索インプット部分 */}
      <InputOuter>
        <p id="desc-for-search-input">例：Button、画面キャプチャ、用字用語、須磨英知など</p>
        <Input
          width="100%"
          prefix={<FaSearchIcon size={24} aria-label="検索" />}
          value={searchState}
          onChange={onSearchStateChange}
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
          aria-labelledby="label-for-search-input"
          aria-describedby="desc-for-search-input"
          name="query"
        />
        {!isAvailable && searchState && <WarningMessage>検索処理を実行するにはAlgoliaのAPIキーの設定が必要です</WarningMessage>}
      </InputOuter>

      {/* 検索結果 */}
      <SearchResultOuter>
        <Hits hitComponent={HitComponent} />
      </SearchResultOuter>
    </>
  )
}
export const CustomSearchBox = connectSearchBox(SearchBox)

const InputOuter = styled.div`
  width: 100%;
  max-width: 712px;
  margin-inline: auto;
  & p {
    margin: 0 0 8px;
    text-align: center;
    font-size: ${CSS_FONT_SIZE.PX_13};
  }
  .smarthr-ui-Input {
    padding-inline: 24px;
    border-radius: 12px;
  }
  .smarthr-ui-Input-input {
    box-sizing: border-box;
    width: 100%;
    height: 78px;
    padding-block: 0;
    padding-inline: 24px 24px;
    border-radius: 12px;
    font-size: 1.5rem;
  }
`

const WarningMessage = styled.div`
  margin-block: 16px;
  padding: 16px;
  background-color: ${CSS_COLOR.CAUTION_LIGHT};
  color: ${CSS_COLOR.CAUTION_HEAVY};
  text-align: center;
`
