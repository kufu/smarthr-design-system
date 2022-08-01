import React, { FC } from 'react'
import styled from 'styled-components'
import { PageProps, graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { MDXProvider, MDXProviderComponents } from '@mdx-js/react'
import { Theme } from './Theme'
import { Head } from '@Components/Head'
import { CodeBlock } from '@Components/article/CodeBlock'
import { Sidebar } from '@Components/article/Sidebar/Sidebar'
import { IndexNav } from '@Components/article/IndexNav/IndexNav'
import { FragmentTitle } from '@Components/article/FragmentTitle/FragmentTitle'
import { INDEXED_DEPTH } from '@Constants/application'
import { GlobalStyle } from '@Components/shared/GlobalStyle/GlobalStyle'
import { Header } from '@Components/shared/Header/Header'
import { RoundedBoxLink } from '@Components/shared/RoundedBoxLink'
import { CSS_COLOR, CSS_FONT_SIZE, CSS_SIZE } from '@Constants/style'
import { Private } from '@Components/shared/Private'
import { SmartHRUIMetaInfo } from '@Components/SmartHRUIMetaInfo'
import { Footer } from '@Components/shared/Footer/Footer'

import { AIRTABLE_CONTENTS } from '@Constants/airtable'
import type { airtableContents } from '@Constants/airtable'

const components: MDXProviderComponents = {
  pre: (props) => <div {...props} />,
  code: CodeBlock,
  h2: ({ children, id }) => (
    <FragmentTitle tag="h2" id={id}>
      {children}
    </FragmentTitle>
  ),
  h3: ({ children, id }) => (
    <FragmentTitle tag="h3" id={id}>
      {children}
    </FragmentTitle>
  ),
  h4: ({ children, id }) => (
    <FragmentTitle tag="h4" id={id}>
      {children}
    </FragmentTitle>
  ),
  h5: ({ children, id }) => (
    <FragmentTitle tag="h5" id={id}>
      {children}
    </FragmentTitle>
  ),
  h6: ({ children, id }) => (
    <FragmentTitle tag="h6" id={id}>
      {children}
    </FragmentTitle>
  ),
}

const shortcodes = {
  Private,
}

export const query = graphql`
  query Article($id: String, $category: String, $airTableName: String) {
    mdx(id: { eq: $id }) {
      id
      body
      headings {
        depth
        value
      }
      frontmatter {
        title
        description
        smarthr_ui
      }
      fields {
        category
        hierarchy
        slug
      }
    }
    parentCategoryAllMdx: allMdx(filter: { fields: { category: { eq: $category } } }) {
      edges {
        node {
          frontmatter {
            title
            order
          }
          fields {
            category
            slug
          }
        }
      }
    }
    airTable: allAirtable(filter: { table: { eq: $airTableName } }) {
      edges {
        node {
          data {
            name
            description
            discussion
            source
            record_id
            order
          }
        }
      }
    }
  }
`

type Props = PageProps<GatsbyTypes.ArticleQuery>

export type SidebarItem = {
  link: string
  order: number
  title: string
  depth: number
  children: SidebarItem[]
}

const Article: FC<Props> = ({ data }) => {
  const { mdx: article, parentCategoryAllMdx: parentCategory } = data

  if (article == null) {
    return null
  }

  const { frontmatter, headings, fields } = article
  const slug = fields?.slug || ''

  const title = frontmatter?.title || ''
  const description = frontmatter?.description || ''

  // 親階層のノードを探す
  const parentCategorySlug = slug.replace(/[^/]+\/$/, '') //例・'/basics/typography/'→'/basics/'
  const parentCategoryNode =
    parentCategory.edges.find((edge) => {
      if (edge.node?.fields?.slug === parentCategorySlug) {
        return true
      }
      return false
    }) ?? null
  const parentCategoryName = parentCategoryNode?.node.frontmatter?.title ?? title

  // memo: カテゴリのtitleとカテゴリ直下のindexページのタイトルが重複した場合はカテゴリ名のみを表示する
  const headTitle = title === parentCategoryName ? title : `${title} | ${parentCategoryName}`

  // Airtableコンテンツのheading。各項目をh2として扱う
  const airTableHeadings = data.airTable.edges.map((edge) => {
    return {
      depth: 2,
      value: edge.node.data?.name ?? '',
      recordId: edge.node.data?.record_id ?? '',
      name: edge.node.data?.name ?? '',
      order: edge.node.data?.order ?? Number.MAX_SAFE_INTEGER,
    }
  })
  // Airtableコンテンツは、ページによりソート方法が異なるので、headingの順序もそれに合わせる
  const airtableSortType =
    AIRTABLE_CONTENTS.filter((item: airtableContents) => {
      return item.pagePath === slug
    })[0]?.sort || 'NONE'

  if (airtableSortType === 'REVERSE') {
    airTableHeadings.reverse()
  }
  if (airtableSortType === 'CHARACTER') {
    airTableHeadings.sort((x, y) => (x.name && y.name ? x.name.localeCompare(y.name, 'ja') : -1))
  }
  if (airtableSortType === 'AIRTABLE') {
    airTableHeadings.sort((x, y) => (x.order && y.order ? x.order - y.order : -1))
  }

  // Mdxコンテンツのheading
  const mdxHeadings =
    headings
      ?.map((heading) => {
        return {
          value: heading?.value ?? '',
          depth: heading?.depth ?? -1,
          recordId: '',
        }
      })
      ?.filter(({ depth }) => depth <= INDEXED_DEPTH) ?? []

  const headingList = [...airTableHeadings, ...mdxHeadings]

  //
  // サイドバー、「前へ」「次へ」コンポーネントのための配列作成
  //

  // 1. Maybe型を排除して
  const depth1Items: SidebarItem[] = []
  const depth2Items: SidebarItem[] = []
  const depth3Items: SidebarItem[] = []
  const depth3ComponentItems: SidebarItem[] = []
  const depth4Items: SidebarItem[] = []
  const depth4ComponentItems: SidebarItem[] = []

  parentCategory.edges.forEach(({ node }) => {
    const link = node.fields?.slug ?? ''

    const item = {
      link: link,
      order: node.frontmatter?.order ?? Number.MAX_SAFE_INTEGER,
      title: node.frontmatter?.title ?? '',
      depth: link.split('/').length - 2,
      children: [],
    }

    if (item.depth === 1) {
      depth1Items.push(item)
    }
    if (item.depth === 2) {
      depth2Items.push(item)
    }
    if (item.depth === 3) {
      if (item.link.includes('/products/components/')) {
        depth3ComponentItems.push(item)
      } else {
        depth3Items.push(item)
      }
    }
    if (item.depth === 4) {
      if (item.link.includes('/products/components/')) {
        depth4ComponentItems.push(item)
      } else {
        depth4Items.push(item)
      }
    }
  })

  // 2. orderで並び替えして
  depth1Items.sort(({ order: a }, { order: b }) => {
    return a - b
  })
  depth2Items.sort(({ order: a }, { order: b }) => {
    return a - b
  })
  // /products/components/以下のコンポーネントページは名前の順でソートするので、別途並べ替える
  depth3ComponentItems.sort(({ title: a }, { title: b }) => {
    return a < b ? -1 : a > b ? 1 : 0
  })
  depth3Items.sort(({ order: a }, { order: b }) => {
    return a - b
  })
  // /products/components/*/以下のコンポーネントページは名前の順でソートするので、別途並べ替える
  depth4ComponentItems.sort(({ title: a }, { title: b }) => {
    return a < b ? -1 : a > b ? 1 : 0
  })
  depth4Items.sort(({ order: a }, { order: b }) => {
    return a - b
  })

  // 3. 一つの配列にする
  const sidebarItems = []
  // サイドバー用にネストした配列も作成する
  const nestedSidebarItems = []

  for (const depth1Item of depth1Items) {
    sidebarItems.push(depth1Item)
    nestedSidebarItems.push(depth1Item)

    for (const depth2Item of depth2Items) {
      sidebarItems.push(depth2Item)
      depth1Item.children.push(depth2Item)

      for (const depth3Item of [...depth3Items, ...depth3ComponentItems]) {
        if (!depth3Item.link.includes(depth2Item.link)) continue

        sidebarItems.push(depth3Item)
        depth2Item.children.push(depth3Item)

        for (const depth4Item of [...depth4Items, ...depth4ComponentItems]) {
          if (!depth4Item.link.includes(depth3Item.link)) continue

          sidebarItems.push(depth4Item)
          depth3Item.children.push(depth4Item)
        }
      }
    }
  }

  //
  // 前・次のページのindexを準備
  //
  const currentPageIndex = sidebarItems.findIndex(({ link }) => {
    // hierarchyはfrontmatterで定義されている値ではなく、
    // gatsby-node.jsで付与されるようになっている値なので、undefinedになることはないはず
    return link === `/${fields!.hierarchy!}/`
  })

  // 同カテゴリ最初or最後のページの場合はnullになる
  const prevPageIndex: number | null = currentPageIndex <= 0 ? null : currentPageIndex - 1
  const nextPageIndex: number | null = currentPageIndex === sidebarItems.length - 1 ? null : currentPageIndex + 1

  return (
    <Theme>
      <Head title={headTitle} description={description} />
      <GlobalStyle />

      <Wrapper>
        <Header />

        <Main>
          <MainSidebar>
            <Sidebar path={slug ?? ''} nestedSidebarItems={nestedSidebarItems} />
          </MainSidebar>

          <MainIndexNav>
            <IndexNav headings={headingList} />
          </MainIndexNav>

          <MainArticle>
            <MainArticleTitle>
              <h1>{title}</h1>
              {frontmatter?.smarthr_ui && <SmartHRUIMetaInfo name={frontmatter.smarthr_ui} />}
            </MainArticleTitle>
            <MDXStyledWrapper>
              <MDXProvider components={{ ...components, ...shortcodes }}>
                <MDXRenderer>{data.mdx?.body}</MDXRenderer>
              </MDXProvider>
            </MDXStyledWrapper>

            {/* 前へ・次へ表示 */}
            <MainArticleNav>
              {prevPageIndex !== null && (
                <PrevArticleLink>
                  <RoundedBoxLink
                    path={sidebarItems[prevPageIndex].link}
                    label="前へ"
                    title={sidebarItems[prevPageIndex].title}
                    align="left"
                    caretPosition="left"
                  />
                </PrevArticleLink>
              )}
              {nextPageIndex !== null && (
                <NextArticleLink>
                  <RoundedBoxLink
                    path={sidebarItems[nextPageIndex].link}
                    label="次へ"
                    title={sidebarItems[nextPageIndex].title}
                    align="right"
                    caretPosition="right"
                  />
                </NextArticleLink>
              )}
            </MainArticleNav>
          </MainArticle>
        </Main>

        <Footer isArticlePage />
      </Wrapper>
    </Theme>
  )
}

export default Article

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > header {
    flex: 0 0 auto;
  }

  & > footer {
    flex: 0 0 auto;
  }
`

const Main = styled.main`
  flex: 1 1 auto;
  display: grid;
  grid-template: 'sidebar article index' auto / 1fr minmax(auto, 712px) 1fr;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_PC_1}) {
    grid-template: 'sidebar article .' auto / 1fr minmax(auto, 712px) minmax(40px, 1fr);
  }

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    grid-template: '. article .' auto / minmax(40px, 1fr) minmax(auto, 712px) minmax(40px, 1fr);
    margin-top: 0;
  }
`

const MainSidebar = styled.div`
  grid-area: sidebar;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: [space] minmax(40px, 1fr) [nav] 232px;
  border-right: 1px solid ${CSS_COLOR.LIGHT_GREY_1};
  margin-right: 40px;

  /* 位置固定用のスタイル */
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;

  & > * {
    grid-column: nav;
  }

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    grid-column: article;
    display: block;
    position: static;
    height: auto;
    border-right: 0;
    margin-right: 0;
    padding-bottom: 32px; /* https://github.com/kufu/smarthr-design-system/issues/501#issuecomment-1000072931 */
    background-color: transparent;
  }
`

const MainIndexNav = styled.div`
  grid-area: index;
  display: grid;
  grid-template-columns: [nav] 232px [space] minmax(40px, 1fr);
  margin-left: 40px;

  /* 位置固定用のスタイル */
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;

  & > * {
    grid-column: nav;
  }

  @media (max-width: ${CSS_SIZE.BREAKPOINT_PC_1}) {
    display: none;
  }
`

const MainArticle = styled.article`
  grid-area: article;
  min-width: 0;
  padding-top: 112px;
  padding-bottom: 240px;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    padding-bottom: 112px;
  }
`

const MainArticleTitle = styled.div`
  & > h1 {
    margin: 0;
    font-size: ${CSS_FONT_SIZE.PX_52};
    line-height: 1.32;
  }
`

const MainArticleNav = styled.ul`
  list-style: none;
  margin-block: 5rem;
  padding: 0;
  display: grid;
  gap: 1rem;
  grid-template: 'left right' 1fr/1fr 1fr;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    grid-template:
      'left' 1fr
      'right' 1fr
      /100%;
  }
`

const PrevArticleLink = styled.li`
  grid-area: left;
`

const NextArticleLink = styled.li`
  grid-area: right;
`

/* MarkDownで書き出されるコンテンツ用のスタイル */
const MDXStyledWrapper = styled.div`
  padding-block-start: 40px;

  > *:first-child {
    margin-block-start: 0;
  }

  /* 画像 */
  img {
    max-width: 100%;
  }

  /* Level2 */
  h2 {
    font-size: ${CSS_FONT_SIZE.PX_36};
    line-height: 1.22;
    margin-block: 120px 0;
    font-weight: bold;
  }

  /* Level3 */
  h3 {
    font-size: ${CSS_FONT_SIZE.PX_26};
    line-height: 1.38;
    margin-block: 80px 0;
  }

  /* Level4 */
  h4 {
    font-size: ${CSS_FONT_SIZE.PX_18};
    line-height: 1.56;
    margin-block: 60px 0;
  }

  /* Level5 */
  h5 {
    font-size: ${CSS_FONT_SIZE.PX_16};
    line-height: 1.76;
    margin-block: 40px 0;
  }

  /* 連続する見出し */
  h2 + h3 {
    margin-block: 20px 0;
  }
  h3 + h4,
  h4 + h5 {
    margin-block: 16px 0;
  }

  /* 本文 */
  p {
    font-size: ${CSS_FONT_SIZE.PX_16};
    line-height: 2.12;
    margin-block: 20px 0;
  }

  /* リスト */
  ul,
  ol {
    font-size: ${CSS_FONT_SIZE.PX_16};
    line-height: 2.12;
    margin-block: 20px 0;
  }

  /* 表組み */
  table {
    margin-block: 20px 0;
    width: 100%;

    th {
      height: 2.5rem;
      vertical-align: middle;
      font-size: ${CSS_FONT_SIZE.PX_14};
      background-color: ${CSS_COLOR.DIVIDER};
    }
  }

  code {
    padding: 0.125rem 0.25rem;
    border-radius: 4px;
    background-color: ${CSS_COLOR.LIGHT_GREY_2};
    font-size: ${CSS_FONT_SIZE.PX_14};
    vertical-align: 0.05rem;
    margin: 0.125rem;
  }

  /* 動画 */
  .youtube {
    aspect-ratio: 16/9;
    width: 100%;
    max-width: 100%;
  }
`
