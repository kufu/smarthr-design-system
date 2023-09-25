import { CSS_COLOR } from '@Constants/style'
import { Link } from 'gatsby'
import React, { FC } from 'react'
import { AccordionPanel, AccordionPanelContent, AccordionPanelItem, AccordionPanelTrigger, Nav as NavComponent } from 'smarthr-ui'
import styled from 'styled-components'

import type { HeadingItem } from './IndexNav'

type Props = { nestedHeadings: HeadingItem[] }

export const SpIndexNav: FC<Props> = ({ nestedHeadings }) => {
  return (
    <AccordionPanel iconPosition="right">
      <AccordionPanelItem name="spIndexNav">
        <AccordionPanelTrigger>ページ内目次</AccordionPanelTrigger>
        <AccordionPanelContent>
          <Nav>
            {nestedHeadings.length > 0 && (
              <ul>
                {nestedHeadings.map((depth2Item) => {
                  return (
                    <li key={depth2Item.fragmentId}>
                      {depth2Item.value !== '' && (
                        <div>
                          <Link to={`#${depth2Item.fragmentId}`}>{depth2Item.value}</Link>
                        </div>
                      )}
                      {depth2Item.children.length > 0 && (
                        <ul>
                          {depth2Item.children.map((depth3Item) => {
                            return (
                              <li key={depth3Item.fragmentId}>
                                <div>
                                  <Link to={`#${depth3Item.fragmentId}`}>{depth3Item.value}</Link>
                                </div>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </Nav>
        </AccordionPanelContent>
      </AccordionPanelItem>
    </AccordionPanel>
  )
}

const Nav = styled(NavComponent)`
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
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
  }
`
