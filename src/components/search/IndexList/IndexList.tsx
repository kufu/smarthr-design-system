import React, { Fragment, VFC } from 'react'
import styled from 'styled-components'
import { CSS_COLOR, CSS_FONT_SIZE } from '../../../constants/style'
import { Link, graphql, useStaticQuery } from 'gatsby'

const SUB_LINKS = [`downloads`, `terms`, `contact`] // リンク表示を別扱いにするページ

const query = graphql`
  query Search {
    allMdx {
      nodes {
        frontmatter {
          title
          order
        }
        fields {
          category
          hierarchy
          slug
        }
      }
    }
  }
`

type ListItem = {
  link: string
  title: string
  parent: string
  order: number
}
export const IndexList: VFC = () => {
  const {
    allMdx: { nodes },
  } = useStaticQuery<GatsbyTypes.SearchQuery>(query)

  const level2Items: ListItem[] = []
  // allとついているのは全てのカテゴリのやつが入っているから
  const allLevel3Items: ListItem[] = []
  const allLevel4Items: ListItem[] = []
  const subLinks: ListItem[] = []

  for (const node of nodes) {
    const path = node.fields?.hierarchy?.split('/') ?? []

    // 3階層より深いのは表示しないのでいらない
    if (path.length > 3) continue

    // 使いやすいように整形して
    const listItem = {
      link: node.fields?.hierarchy ?? '#',
      title: node.frontmatter?.title ?? '',
      parent: path.slice(0, -1).join('/'),
      order: node.frontmatter?.order ?? Number.MAX_SAFE_INTEGER,
    }

    // 該当の階層にpush
    switch (path.length) {
      case 1:
        level2Items.push(listItem)
        continue
      case 2:
        allLevel3Items.push(listItem)
        continue
      case 3:
        allLevel4Items.push(listItem)
        continue
    }
  }

  // 最後に並び替え
  level2Items.sort(({ order: a }, { order: b }) => {
    return a - b
  })
  allLevel3Items.sort(({ order: a }, { order: b }) => {
    return a - b
  })
  allLevel4Items.sort(({ order: a }, { order: b }) => {
    return a - b
  })

  return (
    <Wrapper id="sitemap">
      {/* 第2階層 */}
      {level2Items.map((level2Item) => {
        if (SUB_LINKS.some((link) => new RegExp(`^${link}$`).test(level2Item.link))) {
          subLinks.push(level2Item)
          return null
        }
        const level3Items = allLevel3Items.filter((level3item) => level3item.parent === level2Item.link)
        return (
          <Fragment key={level2Item.link}>
            <h2>
              <Link to={`/${level2Item.link}/`}>{level2Item.title}</Link>
            </h2>

            {/* 第3階層 */}
            {level3Items.map((level3Item) => {
              const level4Items = allLevel4Items.filter((level4Item) => level4Item.parent === level3Item.link)
              return (
                <Fragment key={level3Item.link}>
                  <h3>
                    <Link to={`/${level3Item.link}/`}>{level3Item.title}</Link>
                  </h3>

                  {/* 第4階層 */}
                  {level4Items.length !== 0 && (
                    <ul>
                      {level4Items.map((level4Item) => {
                        return (
                          <li key={level4Item.link}>
                            <Link to={`/${level4Item.link}/`}>{level4Item.title}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </Fragment>
              )
            })}
          </Fragment>
        )
      })}

      <hr />
      {subLinks.map((item) => {
        return (
          <h3 key={item.link}>
            <Link to={`/${item.link}/`}>{item.title}</Link>
          </h3>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 952px;
  padding-inline: 16px;
  margin: 80px auto 0;

  h2 {
    margin: 0;
    padding-top: 80px;
    color: ${CSS_COLOR.BLACK};
    font-size: ${CSS_FONT_SIZE.PX_26};
    line-height: 1.38;
    &::after {
      display: block;
      content: '';
      width: 100%;
      height: 1px;
      background-color: ${CSS_COLOR.DIVIDER_SEARCH_H2};
      margin-block: 8px;
    }
  }

  h3 {
    margin: 0;
    padding: 24px 8px 16px;
    color: ${CSS_COLOR.BLACK};
    font-size: ${CSS_FONT_SIZE.PX_15};
    line-height: 1.6;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    display: grid;
    column-gap: 32px;
    grid-template-columns: repeat(auto-fill, minmax(202px, 1fr));
    margin: 0;
    padding: 0 8px;
    list-style: none;
  }

  li {
    display: flex;
    align-items: flex-start;
    padding-bottom: 14px;
    line-height: 1.38;
    color: ${CSS_COLOR.TEXT_BLACK};
    font-size: ${CSS_FONT_SIZE.PX_13};

    &::before {
      content: '・';
    }
    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  hr {
    margin-block: 120px 40px;
    border-width: 1px 0 0;
    border-style: solid;
    border-color: ${CSS_COLOR.DIVIDER_SEARCH_H2};
  }
`
