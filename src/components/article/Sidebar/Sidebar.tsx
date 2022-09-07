import { Link } from 'gatsby'
import React, { FC, Fragment, useContext, useLayoutEffect, useRef } from 'react'
import { useLocation } from '@reach/router'
import { FaChevronDownIcon, defaultColor } from 'smarthr-ui'
import styled from 'styled-components'
import { CSS_COLOR, CSS_SIZE } from '@Constants/style'
import type { SidebarItem } from '../../../templates/article'

import { SidebarScrollContext } from '@Context/SidebarScrollContext'

type Props = {
  path: string
  nestedSidebarItems: SidebarItem[]
}

export const Sidebar: FC<Props> = ({ path, nestedSidebarItems }) => {
  const location = useLocation()
  const sidebarRef = useRef<null | HTMLDivElement>(null)
  const { position, savePosition } = useContext(SidebarScrollContext)

  useLayoutEffect(() => {
    if (!sidebarRef.current) {
      savePosition(0)
      return
    }
    if (location.pathname.split('/').length < 4) {
      //第一階層の場合
      savePosition(0)
      return
    }
    sidebarRef.current.scrollTo(0, position || 0)
    // 記録されていたスクロール位置より、サイドバーが短い可能性もあるので、実際の位置を保存し直す
    const newPosition = sidebarRef.current.scrollTop
    savePosition(newPosition)

    // スクロール位置が変わるごとに再描画する必要はないため警告を無視する
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const handleScroll = () => {
    const newPosition = sidebarRef.current ? sidebarRef.current.scrollTop : 0
    savePosition(newPosition)
  }

  const onClickCaret = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const clicked = event.currentTarget
    const isOpen = clicked.getAttribute('aria-expanded') === 'true'
    const targetId = clicked.getAttribute('aria-controls')
    const targetUl = document.querySelector(`#${targetId}`)
    if (targetUl === null) return

    targetUl.setAttribute('aria-hidden', isOpen ? 'true' : 'false')
    clicked.setAttribute('aria-expanded', isOpen ? 'false' : 'true')
  }

  return (
    <Nav ref={sidebarRef} onScroll={handleScroll}>
      {nestedSidebarItems.map((depth1Item) => (
        <Fragment key={depth1Item.link}>
          {/* 第1階層 */}
          <Depth1Item>
            <Link to={depth1Item.link} aria-current={path === depth1Item.link}>
              {depth1Item.title}
            </Link>
          </Depth1Item>

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
                        <FaChevronDownIcon size={14} visuallyHiddenText={path.includes(depth2Item.link) ? '閉じる' : '開く'} />
                      </CaretButton>
                    )}
                  </Depth2Item>

                  {/* 第3階層 */}
                  {depth2Item.children.length > 0 && (
                    <ul id={`Depth3Items__${depth2Index}`} aria-hidden={!path.includes(depth2Item.link)}>
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
                                <FaChevronDownIcon
                                  size={14}
                                  visuallyHiddenText={path.includes(depth3Item.link) ? '閉じる' : '開く'}
                                />
                              </CaretButton>
                            )}
                          </Depth3Item>

                          {/* 第4階層 */}
                          {depth3Item.children.length > 0 && (
                            <ul id={`Depth4Items__${depth2Index}__${depth3Index}`} aria-hidden={!path.includes(depth3Item.link)}>
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
    </Nav>
  )
}

const Nav = styled.nav`
  padding-block: 120px 48px;
  overflow-y: auto;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    padding-block: 0;
    overflow-y: visible;
  }

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

const Depth1Item = styled.h2`
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
