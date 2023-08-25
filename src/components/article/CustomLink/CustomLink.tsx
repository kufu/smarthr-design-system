import { Link } from 'gatsby'
import React, { FC } from 'react'
import { FaExternalLinkAltIcon } from 'smarthr-ui'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
  href: string
}

export const CustomLink: FC<Props> = ({ children, href, ...props }) => {
  const isExternal = href.match(/^https?:\/\/(?!smarthr\.design).*?$/) !== null
  const attrs = isExternal
    ? Object.assign(
        { ...props },
        {
          target: '_blank',
          rel: 'noreferrer',
        },
      )
    : props
  return isExternal ? (
    <StyledLink {...attrs} to={href}>
      {children}
      <FaExternalLinkAltIcon />
    </StyledLink>
  ) : (
    <Link {...attrs} to={href}>
      {children}
    </Link>
  )
}

const StyledLink = styled(Link)`
  svg {
    margin-inline: 0.25em;
  }
`
