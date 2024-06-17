import { CSS_COLOR, CSS_FONT_SIZE } from '@Constants/style'
import { Link } from 'gatsby'
import React, { FC } from 'react'
import { FaExternalLinkAltIcon } from 'smarthr-ui'
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
    title: '更新情報（X）',
    path: 'https://twitter.com/SHRDesignSystem',
    isExternal: true,
  },
  {
    title: '運営会社',
    path: 'https://smarthr.co.jp/company/',
    isExternal: true,
  },
]

export const FootStaticLinks: FC<Props> = () => (
  <>
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
              <FaExternalLinkAltIcon />
            </StyledAnchor>
          ) : (
            <StyledLink to={path}>{title}</StyledLink>
          )}
        </li>
      ))}
    </StyledUl>
  </>
)

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

const StyledAnchor = styled.a`
  display: inline-block;
  width: 100%;
  svg {
    margin-inline: 0.25em;
  }
`

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
`
