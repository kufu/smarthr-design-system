import React from 'react'
import { connectStateResults } from 'react-instantsearch-core'
import { Base, defaultBreakpoint } from 'smarthr-ui'
import styled from 'styled-components'

import type { FC } from 'react'
import type { StateResultsProvided } from 'react-instantsearch-core'

// StateResultsProvided の型定義に`children`が含まれていないようでエラーになるため
type _StateResultsProvided = StateResultsProvided & {
  children: React.ReactNode
}

const SearchResultOuterComponent: FC<_StateResultsProvided> = ({ children, searchResults, searchState: { query } }) => {
  // まだ検索してない時は出さない
  if (query === undefined) return null
  // 検索したあと、文字を削除したときも出さない
  if (query === '') return null

  if (searchResults === null) return null

  // searchResults:{ hits }はエラーになるのでこの書き方
  const { hits } = searchResults

  const hasResults = hits.length > 0
  return (
    <SearchPanel>
      <SearchPanelHeader>検索結果</SearchPanelHeader>
      <SearchPanelBody>
        {hasResults ? (
          <>
            <p>{hits.length}件がヒットしました。</p>
            <div>{children}</div>
          </>
        ) : (
          <p>検索結果は見つかりませんでした。</p>
        )}
      </SearchPanelBody>
    </SearchPanel>
  )
}
export const SearchResultOuter = connectStateResults(SearchResultOuterComponent)

const SearchPanel = styled(Base)`
  width: 712px;
  right: 0;
  padding: 8px;
  box-sizing: border-box;

  @media (width <= ${defaultBreakpoint.SP}px) {
    left: 0;
    width: 100%;
  }
`

const SearchPanelHeader = styled.div`
  padding: 8px;
  font-weight: bold;
`

const SearchPanelBody = styled.div`
  padding: 8px;
  max-height: 32em;
  color: black;
  overflow-y: scroll;

  > p {
    font-size: 0.9rem;
    margin: 0;
  }
`
