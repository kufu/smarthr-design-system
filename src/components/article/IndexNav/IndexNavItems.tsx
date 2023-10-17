import { CSS_COLOR, CSS_SIZE } from '@Constants/style'
import { Link } from 'gatsby'
import React, { FC } from 'react'
import { Nav as UINav } from 'smarthr-ui'
import styled from 'styled-components'

import type { HeadingItem } from './IndexNav'

type Props = { nestedHeadings: HeadingItem[]; indexNavRef?: React.RefObject<HTMLUListElement>; currentHeading?: string }

export const IndexNavItems: FC<Props> = ({ nestedHeadings, indexNavRef, currentHeading }) => (
    <Nav>
      {nestedHeadings.length > 0 && (
        <ul ref={indexNavRef}>
          {nestedHeadings.map((depth2Item) => (
              <li key={depth2Item.fragmentId}>
                {depth2Item.value !== '' && (
                  <Depth2Item>
                    <Link to={`#${depth2Item.fragmentId}`} aria-current={currentHeading === depth2Item.fragmentId}>
                      {depth2Item.value}
                    </Link>
                  </Depth2Item>
                )}
                {depth2Item.children.length > 0 && (
                  <ul>
                    {depth2Item.children.map((depth3Item) => (
                        <li key={depth3Item.fragmentId}>
                          <Depth3Item>
                            <Link to={`#${depth3Item.fragmentId}`} aria-current={currentHeading === depth3Item.fragmentId}>
                              {depth3Item.value}
                            </Link>
                          </Depth3Item>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      )}
    </Nav>
  )

const Nav = styled(UINav)`
  display: block;
  padding-top: 160px;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    padding-top: 0;
  }

  > ul {
    margin: 0;
    padding: 0;
    list-style: none;

    &::before {
      content: '';
      display: block;
      width: 120px;
      height: 1px;
      margin-left: 8px;
      margin-bottom: 8px;
      background-color: ${CSS_COLOR.LIGHT_GREY_1};

      @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
        display: none;
      }
    }

    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }

  li {
    > ul {
      margin: 0 0 0 16px;
      padding: 0;
      list-style: none;
    }
  }

  a {
    display: block;
    padding: 8px;
    text-decoration: none;
    color: ${CSS_COLOR.TEXT_GREY};
    &:hover {
      text-decoration: underline;
    }
    &[aria-current] {
      color: inherit;
    }
    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
      padding-inline: 40px;
    }
  }
`

const Depth2Item = styled.div`
  display: block;
  > a[aria-current='true'],
  a[aria-current='true']:hover {
    background-color: ${CSS_COLOR.DIVIDER};
  }
`

const Depth3Item = styled.div`
  display: block;
  > a[aria-current='true'],
  a[aria-current='true']:hover {
    background-color: ${CSS_COLOR.DIVIDER};
  }
`
