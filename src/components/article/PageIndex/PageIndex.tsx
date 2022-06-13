import { Link, graphql, useStaticQuery } from 'gatsby'
import React, { VFC } from 'react'
import styled from 'styled-components'
import { marked } from 'marked'
import { CSS_FONT_SIZE } from '@Constants/style'

type Props = {
  children: React.ReactNode
  path: string
  excludes?: string[]
}

const query = graphql`
  query PageList {
    childPageAllMdx: allMdx {
      edges {
        node {
          frontmatter {
            title
            description
            order
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export const PageIndex: VFC<Props> = ({ path, excludes, children }) => {
  const currentDepth = path.split('/').length
  const data = useStaticQuery<GatsbyTypes.PageListQuery>(query)
  const pageData = data.childPageAllMdx.edges
    .map(({ node }) => {
      const slug = node.fields?.slug || ''
      const pathList = slug.split('/')
      return {
        title: node.frontmatter?.title || '',
        description: node.frontmatter?.description || '',
        order: node.frontmatter?.order || Number.MAX_SAFE_INTEGER,
        slug: slug,
        pathList: pathList,
      }
    })
    .filter((item) => {
      //子ページではない場合は除外
      if (!item.slug.match(`^${path}`) || item.pathList.length !== currentDepth + 1) return false
      //propsで指定された除外リストに入っていた場合も除外
      if (excludes?.includes(item.pathList[item.pathList.length - 2])) return false
      return true
    })
    .sort((x, y) => (x.order && y.order ? x.order - y.order : -1))

  const injectedDescriptions: { [key: string]: string } = {}
  marked.setOptions({ breaks: true }) //改行の手前にスペース*2がなくても<br>に変換したいので
  React.Children.toArray(children)
    .filter((child: any) => {
      // <Description>タグ以外は除外
      if (child.props?.mdxType !== 'Description') return false
      // 子要素が文字列または配列（`{'\n'}`を含む場合は配列になる）以外は除外
      return typeof child.props.children === 'string' || Array.isArray(child.props.children)
    })
    .forEach((child: any) => {
      injectedDescriptions[child.props?.name] = marked.parse(React.Children.toArray(child.props.children).join(''))
    })

  return (
    <Wrapper>
      <PageList>
        {pageData.map((item, idx: number) => {
          const itemName = item.pathList[item.pathList.length - 2]
          return (
            <li key={idx}>
              <PageTitle>
                <Link to={item.slug}>{item.title}</Link>
              </PageTitle>
              {injectedDescriptions[itemName] ? (
                <PageDescription dangerouslySetInnerHTML={{ __html: injectedDescriptions[itemName] }} />
              ) : (
                <PageDescription>{item.description}</PageDescription>
              )}
            </li>
          )
        })}
      </PageList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-block: 4rem;
`

const PageList = styled.ul`
  padding: 0;
  list-style: none;
  > li {
    margin-bottom: 2rem;
  }
`

const PageTitle = styled.div`
  font-size: ${CSS_FONT_SIZE.PX_20};
  font-weight: bold;
`

const PageDescription = styled.div``
