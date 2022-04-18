import React, { VFC } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { CSS_COLOR, CSS_FONT_SIZE } from '../../../constants/style'

type Props = {
  path: string
  children: React.ReactNode
}

export const FloatingTextLink: VFC<Props> = ({ path, children }) => {
  return (
    <Wrapper>
      <Link to={path} aria-disabled={path === ''}>
        <span>{children}</span>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.span`
  display: inline-block;
  font-size: ${CSS_FONT_SIZE.PX_18};
  letter-spacing: 0.1rem;
  > a {
    display: inline-block;
    color: ${CSS_COLOR.MAIN_DARKEN};
    > span {
      display: inline-block;
      position: relative;
      padding-right: 1.8em;
      border-bottom: solid 1px currentColor;
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 0.8em;
        height: 0.8em;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1Ljg3MiA3LjMzNzAzTDAgMC42MDMwMjdWMi4wODUwM0wxNC4yNiA4LjAxMzAzTDAgMTMuOTE1VjE1LjM5N0wxNS44NzIgOC42NjMwM1Y3LjMzNzAzWiIgZmlsbD0iIzAwNjVBOSIvPgo8L3N2Zz4K');
        background-size: contain;
        background-repeat: no-repeat;
        transition: transform 1.5s cubic-bezier(0, 0.7, 0, 1);
      }
    }
    &:hover {
      > span {
        border-bottom-color: transparent;
        &::after {
          transition: transform 0.2s;
          transform: translateY(-50%) translateX(0.25rem);
        }
      }
    }
    &:focus-visible {
      outline: 1px solid currentColor;
      outline-offset: 0.5rem;
      border-radius: 0.25rem;
    }
    &[aria-disabled='true'] {
      color: ${CSS_COLOR.BG_BLUE};
      opacity: 0.5;
      pointer-events: none;
    }
  }
`
