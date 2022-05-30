import React, { VFC } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { TextAnchor } from '../shared/TextAnchor'
import { FragmentTitle } from '../../article/FragmentTitle/FragmentTitle'
import { marked } from 'marked'

const query = graphql`
  query AppWritingTable {
    appWritingData: allAirtable(filter: { table: { eq: "UIテキスト" } }) {
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
export const AppWriting: VFC = () => {
  const data = useStaticQuery<GatsbyTypes.AppWritingTableQuery>(query)

  const appWritingData = data.appWritingData.edges
    .map(({ node }) => ({
      name: node.data?.name,
      description: marked.parse(node.data?.description || ''),
      discussion: node.data?.discussion,
      source: node.data?.source,
      recordId: node.data?.record_id,
      order: node.data?.order || Number.MAX_SAFE_INTEGER,
    }))
    .filter((item) => {
      return item.name
    })
    .sort((x, y) => (x.order && y.order ? x.order - y.order : -1))

  return (
    <>
      {appWritingData.map(({ name, description, discussion, source, recordId }, index) => {
        const generateFragmentId = (suffixId: string) => {
          return recordId ? `${recordId}-${suffixId}` : `${index}-${suffixId}`
        }
        return (
          <Wrapper key={index}>
            <FragmentTitle tag="h2" id={generateFragmentId('0')}>
              {name}
            </FragmentTitle>
            {description && (
              <FragmentTitle tag="h3" id={generateFragmentId('1')}>
                説明
              </FragmentTitle>
            )}
            {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
            {discussion && (
              <FragmentTitle tag="h3" id={generateFragmentId('2')}>
                議事録
              </FragmentTitle>
            )}
            {discussion && <TextAnchor text={discussion} />}
            {source && (
              <FragmentTitle tag="h3" id={generateFragmentId('3')}>
                出典
              </FragmentTitle>
            )}
            {source && <TextAnchor text={source} />}
          </Wrapper>
        )
      })}
    </>
  )
}

const Wrapper = styled.div``
