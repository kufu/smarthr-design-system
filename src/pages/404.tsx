import React, { VFC } from 'react'
import styled from 'styled-components'

import { Head } from '../components/Head'
import { GlobalStyle } from '../components/shared/GlobalStyle/GlobalStyle'
import { Header } from '../components/shared/Header/Header'
import { Footer } from '../components/shared/Footer/Footer'

const NotFoundPage: VFC = () => (
  <>
    <Head
      title="404 Page not found"
      meta={[
        {
          name: 'robots',
          content: 'noindex',
        },
      ]}
    />
    <GlobalStyle />
    <Header />

    <NotFoundContent>
      <h1>404</h1>
      <p>お探しのページは見つかりませんでした</p>
    </NotFoundContent>

    <Footer />
  </>
)

export default NotFoundPage

const NotFoundContent = styled.div`
  margin-top: var(--header-height);
  padding-inline: 16px;
  text-align: center;

  > h1 {
    margin-block: 0;
    font-weight: bold;
    font-size: 4.5rem;
    line-height: 1.5;
    letter-spacing: 1px;
  }

  > p {
    margin-block: 12px 0;
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.5;
    letter-spacing: 1px;
  }
`
