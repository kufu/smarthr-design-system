import { CSS_COLOR, CSS_FONT_SIZE } from '@Constants/style'
import { Link } from 'gatsby'
import React, { FC, Fragment } from 'react'
import { FaChevronDownIcon, Nav, defaultColor } from 'smarthr-ui'
import styled from 'styled-components'

import type { SidebarItem } from '../../../templates/article'

type Props = {
  path: string
  nestedSidebarItems: SidebarItem[]
  showDepth1Item?: boolean
}

export const SidebarItems: FC<Props> = ({ path, nestedSidebarItems, showDepth1Item = true }) => {
  const onClickCaret = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const clicked = event.currentTarget
    const isOpen = clicked.getAttribute('aria-expanded') === 'true'
    const targetId = clicked.getAttribute('aria-controls')
    const targetItems = document.querySelectorAll(`[data-items-id="${targetId}"]`)
    Array.from(targetItems).forEach((targetUl) => {
      targetUl.setAttribute('aria-hidden', isOpen ? 'true' : 'false')
    })
    clicked.setAttribute('aria-expanded', isOpen ? 'false' : 'true')
  }

  return (
    <SidebarNav>
      {nestedSidebarItems.map((depth1Item) => (
        <Fragment key={depth1Item.link}>
          {/* 第1階層 */}
          {showDepth1Item && (
            <Depth1Heading>
              <Link to={depth1Item.link} aria-current={path === depth1Item.link}>
                {depth1Item.title}
              </Link>
            </Depth1Heading>
          )}

          {/* 第2階層 */}
          {depth1Item.children.length > 0 && (
            <ul>
              {depth1Item.children.map((depth2Item, depth2Index) => (
                <li key={depth2Item.link}>
                  <Depth2Item>
                    <Link to={depth2Item.link} aria-current={path === depth2Item.link}>
                      {depth2Item.title}
                    </Link>
                    {depth2Item.children.length > 0 && (
                      <CaretButton
                        aria-controls={`Depth3Items__${depth2Index}`}
                        aria-expanded={path.includes(depth2Item.link)}
                        onClick={onClickCaret}
                      >
                        <FaChevronDownIcon alt={path.includes(depth2Item.link) ? '閉じる' : '開く'} />
                      </CaretButton>
                    )}
                  </Depth2Item>

                  {/* 第3階層 */}
                  {depth2Item.children.length > 0 && (
                    <ul data-items-id={`Depth3Items__${depth2Index}`} aria-hidden={!path.includes(depth2Item.link)}>
                      {depth2Item.children.map((depth3Item, depth3Index) => (
                        <li key={depth3Item.link}>
                          <Depth3Item>
                            <Link to={depth3Item.link} aria-current={path === depth3Item.link}>
                              {depth3Item.title}
                            </Link>
                            {depth3Item.children.length > 0 && (
                              <CaretButton
                                aria-controls={`Depth4Items__${depth2Index}__${depth3Index}`}
                                aria-expanded={path.includes(depth3Item.link)}
                                onClick={onClickCaret}
                              >
                                <FaChevronDownIcon alt={path.includes(depth3Item.link) ? '閉じる' : '開く'} />
                              </CaretButton>
                            )}
                          </Depth3Item>

                          {/* 第4階層 */}
                          {depth3Item.children.length > 0 && (
                            <ul
                              data-items-id={`Depth4Items__${depth2Index}__${depth3Index}`}
                              aria-hidden={!path.includes(depth3Item.link)}
                            >
                              {depth3Item.children.map((depth4Item) => (
                                <li key={depth4Item.link}>
                                  <Depth4Item>
                                    <Link to={depth4Item.link} aria-current={path === depth4Item.link}>
                                      {depth4Item.title}
                                    </Link>
                                  </Depth4Item>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Fragment>
      ))}
    </SidebarNav>
  )
}

const SidebarNav = styled(Nav)`
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    &[aria-hidden='true'] {
      display: none;
    }
  }

  /* 第3階層目 */
  & li li {
    margin-block: 8px;
    margin-left: 16px;
  }

  /* 第4階層目 */
  & li li li {
    margin-block: 8px;
    margin-left: 16px;
  }

  & li a {
    display: block;
    color: inherit;
    text-decoration: none;
    padding: 8px 32px 8px 8px;

    &[aria-current='true'],
    &[aria-current='true']:hover {
      background-color: ${CSS_COLOR.DARK_GREY_1};
      color: ${CSS_COLOR.WHITE};
      + button {
        color: ${CSS_COLOR.WHITE};
      }
    }
    &:hover {
      background-color: ${CSS_COLOR.DIVIDER};
    }

    &:focus-visible {
      outline-offset: -1px;
    }
  }

  & div:hover {
    > a {
      background-color: ${CSS_COLOR.DIVIDER};
    }
    > a[aria-current='true'] {
      background-color: ${CSS_COLOR.DARK_GREY_1};
      color: ${CSS_COLOR.WHITE};
      + button {
        background-color: ${CSS_COLOR.DARK_GREY_1};
        color: ${CSS_COLOR.WHITE};
        &:hover {
          background-color: ${CSS_COLOR.TEXT_GREY};
        }
      }
    }
  }
`

const Depth1Heading = styled.h2`
  margin-block: 0 24px;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.71;
  color: ${defaultColor.TEXT_GREY};

  a {
    color: inherit;
    text-decoration: none;

    &:focus-visible {
      outline-offset: -1px;
    }
  }
`
const Depth2Item = styled.div`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.33;
  position: relative;
`
const Depth3Item = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.2;
  position: relative;
`
const Depth4Item = styled.div`
  font-size: 16px;
  line-height: 1.2;
`
const CaretButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 2rem;
  height: 100%;
  top: 0;
  right: 0;
  border: 0;
  background: none;
  color: ${CSS_COLOR.TEXT_GREY};
  cursor: pointer;
  font-size: ${CSS_FONT_SIZE.PX_14};

  &:hover {
    background-color: ${CSS_COLOR.LIGHT_GREY_1};
  }

  > span {
    top: 0; /* -1pxだとフォーカスリングがずれて見えるため */
  }

  &[aria-expanded='true'] > .smarthr-ui-Icon {
    transform: rotate(180deg);
  }
`
