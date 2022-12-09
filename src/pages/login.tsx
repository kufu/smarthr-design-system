import { Head as HeadComponent } from '@Components/Head'
import { LoginPage } from '@Components/login/Login'
import { GlobalStyle } from '@Components/shared/GlobalStyle/GlobalStyle'
import { Header } from '@Components/shared/Header/Header'
import { CSS_SIZE } from '@Constants/style'
import React, { FC } from 'react'
import styled from 'styled-components'

export const Head = () => {
  return <HeadComponent title="従業員向けログイン" description="従業員向けのログインページです。" />
}

const Login: FC = () => {
  return (
    <>
      <GlobalStyle />
      <Header />

      <LoginContainer>
        <LoginPage />
      </LoginContainer>
    </>
  )
}

export default Login

const LoginContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--header-height);
  padding-inline: 16px;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    margin-top: 0;
  }
`
