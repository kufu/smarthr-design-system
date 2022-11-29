import { CSS_COLOR } from '@Constants/style'
import { Link } from 'gatsby'
import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  headings: Array<{ value: string; recordId: string; depth: number }> | null
}
export const IndexNav: FC<Props> = ({ headings }) => {
  if (headings === null) return null

  const nestedHeadings: Array<{ value: string; recordId: string; children: Array<{ value: string }>; depth: number }> = []
  headings.forEach((heading) => {
    if (heading.depth > 3) return
    if (heading.depth === 1)
      nestedHeadings.push({ value: heading.value, recordId: heading.recordId || '', children: [], depth: 1 })
    if (heading.depth === 2)
      nestedHeadings.push({ value: heading.value, recordId: heading.recordId || '', children: [], depth: 2 })
    if (heading.depth === 3) {
      // 親となる第2階層がない場合、仮の親となるアイテムをpushする。
      if (!nestedHeadings[nestedHeadings.length - 1]) nestedHeadings.push({ value: '', recordId: '', children: [], depth: 0 })
      nestedHeadings[nestedHeadings.length - 1].children.push({ value: heading.value })
    }
  })

  let depth3Index: number = 0

  return (
    <Nav>
      <ul>
        {nestedHeadings.map((depth2Item, depth2Index) => {
          /* Airtable由来のコンテンツではrecord_idをアンカーとして使用する */
          const depth2Id = depth2Item.recordId === '' ? `h2-${depth2Index}` : `${depth2Item.recordId}-0`
          return (
            <li key={depth2Id}>
              {(() => {
                switch (depth2Item.depth) {
                  case 0:
                    return null
                  case 1:
                    return (
                      <Depth1Item>
                        {/* h1がマークダウンにあるのはおかしいので警告表示をします */}
                        <Link to={`#${depth2Id}`}>{depth2Item.value}</Link>
                      </Depth1Item>
                    )
                  case 2:
                    return (
                      <Depth2Item>
                        <Link to={`#${depth2Id}`}>{depth2Item.value}</Link>
                      </Depth2Item>
                    )
                  default:
                    return null
                }
              })()}
              <ul>
                {depth2Item.children.map((depth3Item) => {
                  const depth3Id = `h3-${depth3Index}`
                  depth3Index += 1
                  return (
                    <li key={depth3Id}>
                      <Depth3Item>
                        <Link to={`#${depth3Id}`}>{depth3Item.value}</Link>
                      </Depth3Item>
                    </li>
                  )
                })}
              </ul>
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

const Depth1Item = styled.div`
  background-color: ${CSS_COLOR.WARNING};
`

const Depth2Item = styled.div`
  display: block;
`

const Depth3Item = styled.div`
  display: block;
`
