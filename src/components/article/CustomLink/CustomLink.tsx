import { Link } from 'gatsby'
import React, { FC } from 'react'
import { FaExternalLinkAltIcon } from 'smarthr-ui'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
  href: string
}

export const CustomLink: FC<Props> = ({ children, href }) => {
  const isExternal = href.match(/^https?:\/\/(?!smarthr\.design).*?$/) !== null
  return isExternal ? (
    <StyledLink to={href} target="_blank" rel="noreferrer">
      {children}
      <FaExternalLinkAltIcon />
    </StyledLink>
  ) : (
    <Link to={href}>{children}</Link>
  )
}

const StyledLink = styled(Link)`
  svg {
    margin-inline: 0.25em;
  }
`
