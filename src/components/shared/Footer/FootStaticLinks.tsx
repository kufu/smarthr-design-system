import React, { VFC, useContext } from 'react'
import styled from 'styled-components'
import { AnchorButton } from 'smarthr-ui'
import { CSS_COLOR, CSS_FONT_SIZE } from '../../../constants/style'
import { Link } from 'gatsby'

import { LoginContext } from '../../../context/LoginContext'

type Props = unknown

const Link1 = [
  {
    title: 'さがす',
    path: '/search/',
    isExternal: false,
  },
  {
    title: 'ダウンロード一覧',
    path: '/downloads/',
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

export const FootStaticLinks: VFC<Props> = () => {
  const { loginStatus, loginLabel } = useContext(LoginContext)

  return (
    <>
      <StyledAnchorButton
        size="s"
        className={loginStatus === 'pending' ? 'loginStatusPending loginButton' : 'loginButton'}
        {...(loginStatus !== 'loggedIn' && { href: '/login/' })}
      >
        {loginLabel}
      </StyledAnchorButton>

      <StyledUl large>
        {Link1.map(({ title, path, isExternal }, index) => (
          <li key={index}>
            {isExternal ? (
              <a href={path} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            ) : (
              <Link to={path}>{title}</Link>
            )}
          </li>
        ))}
      </StyledUl>

      <StyledUl>
        {Link2.map(({ title, path, isExternal }, index) => (
          <li key={index}>
            {isExternal ? (
              <a href={path} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            ) : (
              <Link to={path}>{title}</Link>
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
