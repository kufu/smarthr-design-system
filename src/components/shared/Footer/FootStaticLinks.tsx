import { CSS_COLOR, CSS_FONT_SIZE } from '@Constants/style'
import { LoginContext } from '@Context/LoginContext'
import { Link } from 'gatsby'
import React, { FC, useContext } from 'react'
import { AnchorButton } from 'smarthr-ui'
import styled from 'styled-components'

type Props = unknown

const Link1 = [
  {
    title: 'さがす',
    path: '/search/',
    isExternal: false,
  },
]

const Link2 = [
  {
    title: '利用規約',
    path: '/terms/',
    isExternal: false,
  },
  {
    title: 'お問い合わせ・フィードバック',
    path: '/contact/',
    isExternal: false,
  },
  {
    title: '運用ガイドライン',
    path: '/operational-guideline/',
    isExternal: false,
  },
  {
    title: '更新情報（Twitter）',
    path: 'https://twitter.com/SHRDesignSystem',
    isExternal: true,
  },
  {
    title: '運営会社',
    path: 'https://smarthr.co.jp/company/',
    isExternal: true,
  },
]

export const FootStaticLinks: FC<Props> = () => {
  const { loginStatus, loginLabel } = useContext(LoginContext)

  return (
    <>
      <StyledAnchorButton
        {...(loginStatus !== 'loggedIn' && { href: '/login/' })}
        size="s"
        className={loginStatus === 'pending' ? 'loginStatusPending loginButton' : 'loginButton'}
      >
        {loginLabel}
      </StyledAnchorButton>

      <StyledUl large>
        {Link1.map(({ title, path, isExternal }, index) => (
          <li key={index}>
            {isExternal ? (
              <StyledAnchor href={path} target="_blank" rel="noopener noreferrer">
                {title}
              </StyledAnchor>
            ) : (
              <StyledLink to={path}>{title}</StyledLink>
            )}
          </li>
        ))}
      </StyledUl>

      <StyledUl>
        {Link2.map(({ title, path, isExternal }, index) => (
          <li key={index}>
            {isExternal ? (
              <StyledAnchor href={path} target="_blank" rel="noopener noreferrer">
                {title}
              </StyledAnchor>
            ) : (
              <StyledLink to={path}>{title}</StyledLink>
            )}
          </li>
        ))}
      </StyledUl>
    </>
  )
}

const StyledUl = styled.ul<{ large?: boolean }>`
  margin: 0;
  padding: 0;
  list-style: none;
  color: ${CSS_COLOR.TEXT_BLACK};

  li {
    font-size: ${(props) => (props.large ? CSS_FONT_SIZE.PX_16 : CSS_FONT_SIZE.PX_12)};
    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &.loginButton:hover {
      text-decoration: none;
    }
  }
`

const StyledAnchorButton = styled(AnchorButton)`
  min-width: 120px;
  text-align: center;
  &:not([href]) {
    border: 0;
    background-color: ${CSS_COLOR.LIGHT_GREY_2};
    color: ${CSS_COLOR.TEXT_GREY};
  }
  &.loginButton:hover {
    text-decoration: none;
  }
  &.loginStatusPending {
    visibility: hidden;
  }
`

const StyledAnchor = styled.a`
  display: inline-block;
  width: 100%;
`

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
`
