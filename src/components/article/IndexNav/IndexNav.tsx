import { CSS_COLOR } from '@Constants/style'
import { Link } from 'gatsby'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

type Props = { target: React.RefObject<HTMLElement> }
type HeadingItem = {
  value: string
  children: Array<{ value: string; fragmentId?: string }>
  depth: number
  fragmentId: string
}

export const IndexNav: FC<Props> = ({ target }) => {
  const [nestedHeadings, setNestedHeadings] = useState<HeadingItem[]>([])

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

      if (element.tagName === 'H3') {
        // id属性がない場合は付与する
        if (idAttr === null) element.setAttribute('id', `h3-c${index}`)

        // 親となる第2階層がない場合、仮の親となるアイテムをpushする。
        if (!_nestedHeadings[_nestedHeadings.length - 1])
          _nestedHeadings.push({ value: '', children: [], depth: 0, fragmentId: '' })

        if (!idAttr?.startsWith('rec'))
          //Airtableコンテンツの場合はh3は除外
          _nestedHeadings[_nestedHeadings.length - 1].children.push({
            value: element.textContent || '',
            fragmentId: element.getAttribute('id') || `h3-c${index}`,
          })
      }
    })
    setNestedHeadings(_nestedHeadings)
  }, [target])

  return (
    <Nav>
      <ul>
        {nestedHeadings.map((depth2Item) => {
          return (
            <li key={depth2Item.fragmentId}>
              {depth2Item.value !== '' && (
                <Depth2Item>
                  <Link to={`#${depth2Item.fragmentId}`}>{depth2Item.value}</Link>
                </Depth2Item>
              )}
              {depth2Item.children.length > 0 && (
                <ul>
                  {depth2Item.children.map((depth3Item) => {
                    return (
                      <li key={depth3Item.fragmentId}>
                        <Depth3Item>
                          <Link to={`#${depth3Item.fragmentId}`}>{depth3Item.value}</Link>
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
    </Nav>
  )
}

const Nav = styled.nav`
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
    padding: 8px;
    > ul {
      margin: 0 0 0 16px;
      padding: 0;
      list-style: none;
    }
  }

  a {
    display: block;
    text-decoration: none;
    color: ${CSS_COLOR.TEXT_GREY};
    &:hover {
      text-decoration: underline;
    }
    &[aria-current] {
      color: inherit;
    }
  }
`

const Depth2Item = styled.div`
  display: block;
`

const Depth3Item = styled.div`
  display: block;
`
