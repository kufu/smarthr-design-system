import React, { FC } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { Text } from 'smarthr-ui'
import { TextUrlToLink } from '../shared/TextUrlToLink'
import { FragmentTitle } from '../../article/FragmentTitle/FragmentTitle'
import { marked } from 'marked'

const query = graphql`
  query BasicConceptTable {
    basicConceptData: allAirtable(filter: { table: { eq: "基本的な考え方や表記" } }) {
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
export const BasicConceptTable: FC = () => {
  const data = useStaticQuery<GatsbyTypes.BasicConceptTableQuery>(query)

  const basicConceptData = data.basicConceptData.edges
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
      {basicConceptData.map(({ name, description, discussion, source, recordId }, index) => {
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
            {discussion && (
              <StyledText as="p">
                <TextUrlToLink text={discussion} />
              </StyledText>
            )}
            {source && (
              <FragmentTitle tag="h3" id={generateFragmentId('3')}>
                出典
              </FragmentTitle>
            )}
            {source && (
              <StyledText as="p">
                <TextUrlToLink text={source} />
              </StyledText>
            )}
          </Wrapper>
        )
      })}
    </>
  )
}

const Wrapper = styled.div``
const StyledText = styled(Text)`
  white-space: pre-wrap;
  word-wrap: break-word;
`
