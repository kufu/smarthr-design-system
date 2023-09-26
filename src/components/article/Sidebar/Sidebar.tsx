import { CSS_COLOR, CSS_SIZE } from '@Constants/style'
import { SidebarScrollContext } from '@Context/SidebarScrollContext'
import { useLocation } from '@reach/router'
import React, { FC, useContext, useLayoutEffect, useRef } from 'react'
import { AccordionPanel, AccordionPanelContent, AccordionPanelItem, AccordionPanelTrigger } from 'smarthr-ui'
import styled from 'styled-components'

import { SidebarItems } from './SidebarItems'

import type { SidebarItem } from '../../../templates/article'

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

  return (
    <>
      {/* PC表示 */}
      <NavWrapper ref={sidebarRef} onScroll={handleScroll}>
        <SidebarItems path={path} nestedSidebarItems={nestedSidebarItems} />
      </NavWrapper>
      {/* SP表示 */}
      {nestedSidebarItems[0]?.children.length > 0 && (
        <SpSidebar>
          <AccordionPanel iconPosition="right">
            <AccordionPanelItem name="spSidebar">
              <AccordionPanelTrigger>{nestedSidebarItems[0].title}</AccordionPanelTrigger>
              <AccordionPanelContent>
                <SidebarItems path={path} nestedSidebarItems={nestedSidebarItems} showDepth1Item={false} />
              </AccordionPanelContent>
            </AccordionPanelItem>
          </AccordionPanel>
        </SpSidebar>
      )}
    </>
  )
}

const NavWrapper = styled.div`
  padding-block: 120px 48px;
  overflow-y: auto;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    display: none;
  }
`

const SpSidebar = styled.div`
  display: none;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    display: block;
    border-bottom: 1px solid ${CSS_COLOR.LIGHT_GREY_1};
  }

  button {
    color: inherit;
  }
`
