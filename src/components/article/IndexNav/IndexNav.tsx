import { CSS_COLOR, CSS_SIZE } from '@Constants/style'
import { throttle } from '@Lib/throttle'
import { Link } from 'gatsby'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Nav as NavComponent } from 'smarthr-ui'
import styled from 'styled-components'

import { SpIndexNav } from './SpIndexNav'

type Props = { target: React.RefObject<HTMLElement>; ignoreH3Nav?: boolean }
export type HeadingItem = {
  value: string
  children: Array<{ value: string; fragmentId?: string }>
  depth: number
  fragmentId: string
}

export const IndexNav: FC<Props> = ({ target, ignoreH3Nav = false }) => {
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
      const headingList = Array.from(currentRef.querySelectorAll('h2, h3')).filter((element) => {
        return !(element.tagName === 'H3' && ignoreH3Nav)
      })
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
    const navElement = indexNavRef.current?.parentElement // Navにrefを渡せないため、ulの親要素として取得する
    if (!(currentItem instanceof HTMLElement) || !navElement) return

    // 表示されている範囲の上端・下端の取得
    const navAreaTop = navElement.scrollTop
    const navAreaBottom = navAreaTop + navElement.clientHeight
    // 表示範囲に入っていれば何もしない
    if (currentItem.offsetTop > navAreaTop && currentItem.offsetTop < navAreaBottom) return

    // 現在地が表示範囲の中央に来るようにスクロールする
    navElement.scrollTop = currentItem.offsetTop - navElement.clientHeight / 2
  }, [currentHeading, indexNavRef])

  return (
    <>
      {/* PC表示 */}
      <Nav>
        {nestedHeadings.length > 0 && (
          <ul ref={indexNavRef}>
            {nestedHeadings.map((depth2Item) => {
              return (
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
                      {depth2Item.children.map((depth3Item) => {
                        return (
                          <li key={depth3Item.fragmentId}>
                            <Depth3Item>
                              <Link to={`#${depth3Item.fragmentId}`} aria-current={currentHeading === depth3Item.fragmentId}>
                                {depth3Item.value}
                              </Link>
                            </Depth3Item>
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
      {/* SP表示 */}
      <SpWrapper>
        <SpIndexNav nestedHeadings={nestedHeadings} />
      </SpWrapper>
    </>
  )
}

const Nav = styled(NavComponent)`
  display: block;
  padding-top: 160px;
  overflow-y: auto;

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
  }

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    display: none;
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

const SpWrapper = styled.div`
  display: none;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    display: block;
  }
  button {
    color: inherit;
  }
`
