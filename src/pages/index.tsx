import React, { VFC } from 'react'
import styled from 'styled-components'
import { CSS_SIZE } from '../constants/style'

import { Head } from '../components/Head'
import { GlobalStyle } from '../components/shared/GlobalStyle/GlobalStyle'
import { Header } from '../components/shared/Header/Header'
import { Footer } from '../components/shared/Footer/Footer'

import { Introduction } from '../components/index/Introduction'
import { ContentNavigation } from '../components/index/ContentNavigation'
import { SearchLink } from '../components/index/SearchLink'
import { FaqList } from '../components/index/Faq'
import { Gotcha } from '../components/index/Gotcha'

const Home: VFC = () => {
  return (
    <>
      <Head />
      <GlobalStyle />
      <Header isIndex />
      <GotchaContainer>
        <Gotcha />
      </GotchaContainer>

      <IndexPageContainer>
        <Introduction />
        <ContentNavigation />
        <SearchLink />
        <FaqList />
      </IndexPageContainer>

      <Footer />
    </>
  )
}

export default Home

const GotchaContainer = styled.div`
  margin: 40px 80px 192px;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_PC_1}) {
    margin-top: 48px;
  }
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    margin: 0 1rem 4rem;
    padding-top: 0;
  }
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    margin: 0 0 64px;
  }
`

const IndexPageContainer = styled.div`
  max-width: ${CSS_SIZE.CONTENT_WIDTH};
  margin: 0 auto;
  padding: 0 120px;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    padding: 0 48px;
  }
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    padding: 0;

    /*
      子孫要素にvwを使用して画面幅いっぱいになる要素がいるため
      はみ出ないようにしてスクロールバーが発生しないようにする
    */
    overflow: hidden;
  }
`
