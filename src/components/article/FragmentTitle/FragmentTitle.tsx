import React, { FC } from 'react'
import styled from 'styled-components'
import { FaLinkIcon } from 'smarthr-ui'

type Props = {
  children: React.ReactNode
  id: string
  tag?: HeadingTagTypes
}

type HeadingTagTypes = 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'

export const FragmentTitle: FC<Props> = ({ tag = 'h2', id, children }) => {
  return (
    <Wrapper as={tag} id={id}>
      <a href={`#${id}`}>
        <FaLinkIcon size={16} className="icon" />
        {children}
      </a>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  scroll-margin-top: 225px;

  .icon {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: -24px;
    visibility: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;

      .icon {
        visibility: visible;
      }
    }
  }
`
