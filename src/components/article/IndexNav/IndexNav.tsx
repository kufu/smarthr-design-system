import { CSS_COLOR, CSS_SIZE } from '@Constants/style'
import { throttle } from '@Lib/throttle'
import React, { FC, useEffect, useRef, useState } from 'react'
import { AccordionPanel, AccordionPanelContent, AccordionPanelItem, AccordionPanelTrigger } from 'smarthr-ui'
import styled from 'styled-components'

import { IndexNavItems } from './IndexNavItems'

type Props = { target: React.RefObject<HTMLElement>; ignoreH3Nav?: boolean }
export type HeadingItem = {
  value: string
  children: Array<{ value: string; fragmentId?: string }>
  depth: number
  fragmentId: string
}

export const IndexNav: FC<Props> = ({ target, ignoreH3Nav = false }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const indexNavRef = useRef<HTMLUListElement>(null)
  const [nestedHeadings, setNestedHeadings] = useState<HeadingItem[]>([])
  const [currentHeading, setCurrentHeading] = useState<string>('')

  //クライアントでのレンダリング時にページ内インデックスのマークアップを作成する
  useEffect(() => {
    const headings = target.current?.querySelectorAll('h2, h3')
    const _nestedHeadings: HeadingItem[] = []
    headings?.forEach((element, index) => {
      const idAttr = element.getAttribute('id')

      if (element.tagName === 'H2') {
        // id属性がない場合は付与する
        if (idAttr === null) element.setAttribute('id', `h2-c${index}`)
        _nestedHeadings.push({
          value: element.textContent || '',
          children: [],
          depth: 2,
          fragmentId: idAttr || `h2-c${index}`,
        })
      }

      if (element.tagName === 'H3' && !ignoreH3Nav) {
        // id属性がない場合は付与する
        if (idAttr === null) element.setAttribute('id', `h3-c${index}`)

        // 親となる第2階層がない場合、仮の親となるアイテムをpushする。
        if (!_nestedHeadings[_nestedHeadings.length - 1])
          _nestedHeadings.push({ value: '', children: [], depth: 0, fragmentId: '' })

        _nestedHeadings[_nestedHeadings.length - 1].children.push({
          value: element.textContent || '',
          fragmentId: element.getAttribute('id') || `h3-c${index}`,
        })
      }
    })
    setNestedHeadings(_nestedHeadings)
  }, [target, ignoreH3Nav])

  useEffect(() => {
    // スクロール時に現在地を示すための処理
    const handleScroll = throttle(() => {
      const currentRef = target.current
      if (!currentRef) return
      const headingList = Array.from(currentRef.querySelectorAll('h2, h3')).filter(
        (element) => !(element.tagName === 'H3' && ignoreH3Nav),
      )
      const _currentHeading = headingList.find((element, index) => {
        const elementTop = element.getBoundingClientRect().top
        const nextItemTop = headingList[index + 1]?.getBoundingClientRect().top
        // 200pxより上にあり、かつ次の見出しがが200pxより下にあるものを現在地とする
        //（最後の見出しの場合は、200pxより上にあれば現在地とする）
        return elementTop < 200 && (nextItemTop === undefined || nextItemTop > 200)
      })
      setCurrentHeading(_currentHeading?.getAttribute('id') || '')
    }, 200)
    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [target, ignoreH3Nav])

  useEffect(() => {
    // 現在地が移動した際、その見出しが表示範囲内に入るようにスクロールする処理
    const currentItem = indexNavRef.current?.querySelector(`a[aria-current="true"]`)
    const wrapperElement = wrapperRef.current
    if (!(currentItem instanceof HTMLElement) || !wrapperElement) return

    // 表示されている範囲の上端・下端の取得
    const navAreaTop = wrapperElement.scrollTop
    const navAreaBottom = navAreaTop + wrapperElement.clientHeight
    // 表示範囲に入っていれば何もしない
    if (currentItem.offsetTop > navAreaTop && currentItem.offsetTop < navAreaBottom) return

    // 現在地が表示範囲の中央に来るようにスクロールする
    wrapperElement.scrollTop = currentItem.offsetTop - wrapperElement.clientHeight / 2
  }, [currentHeading, indexNavRef])

  return (
    <>
      {/* PC表示 */}
      <NavWrapper ref={wrapperRef}>
        <IndexNavItems nestedHeadings={nestedHeadings} indexNavRef={indexNavRef} currentHeading={currentHeading} />
      </NavWrapper>
      {/* SP表示 */}
      {nestedHeadings.length > 0 && (
        <SpWrapper>
          <AccordionPanel iconPosition="right">
            <AccordionPanelItem name="spIndexNav">
              <AccordionPanelTrigger>ページ内目次</AccordionPanelTrigger>
              <AccordionPanelContent>
                <IndexNavItems nestedHeadings={nestedHeadings} />
              </AccordionPanelContent>
            </AccordionPanelItem>
          </AccordionPanel>
        </SpWrapper>
      )}
    </>
  )
}

const NavWrapper = styled.div`
  overflow-y: auto;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    display: none;
  }
`

const SpWrapper = styled.div`
  display: none;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    display: block;
    border-bottom: 1px solid ${CSS_COLOR.LIGHT_GREY_1};
  }
  button {
    font-family: inherit;
    color: inherit;
    padding-inline: 24px;
  }
`
