import { Head as HeadComponent } from '@Components/Head'
import { IndexList } from '@Components/search/IndexList/IndexList'
import { CustomSearchBox } from '@Components/search/Search'
import { Footer } from '@Components/shared/Footer/Footer'
import { GlobalStyle } from '@Components/shared/GlobalStyle/GlobalStyle'
import { Header } from '@Components/shared/Header/Header'
import { CSS_COLOR, CSS_SIZE } from '@Constants/style'
import algoliasearch from 'algoliasearch/lite'
import React, { FC } from 'react'
import { InstantSearch } from 'react-instantsearch-dom'
import { PageHeading } from 'smarthr-ui'
import styled from 'styled-components'

export const Head = () => <HeadComponent title="検索" description="検索ページです。" />

const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID || '', process.env.GATSBY_ALGOLIA_SEARCH_API_KEY || '')

const SearchPage: FC = () => (
  <>
    <GlobalStyle />

    <Wrapper>
      <Header />

      <Main>
        <StyledPageHeading id="label-for-search-input">SmartHR Design Systemを検索</StyledPageHeading>
        <Search className="ais-SearchBox__root">
          <InstantSearch indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME || ''} searchClient={searchClient}>
            <CustomSearchBox
              isAvailable={process.env.GATSBY_ALGOLIA_APP_ID && process.env.GATSBY_ALGOLIA_SEARCH_API_KEY ? true : false}
            />
          </InstantSearch>
        </Search>
      </Main>
      <IndexList />
      <Footer />
    </Wrapper>
  </>
)

export default SearchPage

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  & > header {
    flex: 0 0 auto;
  }
`

const Main = styled.main`
  padding-inline: 16px;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    margin-top: 0;
  }
`

const StyledPageHeading = styled(PageHeading)`
  margin-block: 140px 40px;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  line-height: 1.25;
`

const Search = styled.div`
  color: ${CSS_COLOR.TEXT_BLACK};
  display: flex;
  flex-direction: column;
  align-items: center;
`
