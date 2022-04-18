import { Link } from 'gatsby'
import React, { Fragment, VFC, useContext, useLayoutEffect, useRef } from 'react'
import { useLocation } from '@reach/router'
import { defaultColor } from 'smarthr-ui'
import styled from 'styled-components'
import { CSS_COLOR, CSS_SIZE } from '../../../constants/style'
import type { SidebarItem } from '../../../templates/article'

import { SidebarScrollContext } from '../../../context/SidebarScrollContext'

type Props = {
  path: string
  sidebarItems: SidebarItem[]
}

export const Sidebar: VFC<Props> = ({ path, sidebarItems }) => {
  const depth1Items = sidebarItems.filter(({ depth }) => depth === 1)
  const depth2Items = sidebarItems.filter(({ depth }) => depth === 2)
  const depth3Items = sidebarItems.filter(({ depth }) => depth === 3)
  const depth4Items = sidebarItems.filter(({ depth }) => depth === 4)

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

  return (
    <Nav ref={sidebarRef} onScroll={handleScroll}>
      {depth1Items.map((depth1Item) => (
        <Fragment key={depth1Item.link}>
          {/* 第1階層 */}
          <Depth1Item>
            <Link to={depth1Item.link} aria-current={path === depth1Item.link}>
              {depth1Item.title}
            </Link>
          </Depth1Item>

          {/* 第2階層 */}
          {depth2Items.length !== 0 && depth2Items[0].link.includes(depth1Item.link) && (
            <ul>
              {depth2Items.map((depth2Item) => (
                <li key={depth2Item.link}>
                  <Depth2Item>
                    <Link to={depth2Item.link} aria-current={path === depth2Item.link}>
                      {depth2Item.title}
                    </Link>
                  </Depth2Item>

                  {/* 第3階層 */}
                  {depth3Items.length !== 0 && depth3Items[0].link.includes(depth2Item.link) && (
                    <ul>
                      {depth3Items.map((depth3Item) => (
                        <li key={depth3Item.link}>
                          <Depth3Item>
                            <Link to={depth3Item.link} aria-current={path === depth3Item.link}>
                              {depth3Item.title}
                            </Link>
                          </Depth3Item>

                          {/* 第4階層 */}
                          {depth4Items.length !== 0 && depth4Items[0].link.includes(depth3Item.link) && (
                            <ul>
                              {depth4Items.map((depth4Item) => (
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
    padding: 8px 16px 8px 8px;

    &[aria-current='true'],
    &[aria-current='true']:hover {
      background-color: ${CSS_COLOR.DARK_GREY_1};
      color: ${CSS_COLOR.WHITE};
    }
    &:hover {
      background-color: ${CSS_COLOR.DIVIDER};
    }

    &:focus-visible {
      outline-offset: -1px;
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
`
const Depth3Item = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.2;
`
const Depth4Item = styled.div`
  font-size: 16px;
  line-height: 1.2;
`
