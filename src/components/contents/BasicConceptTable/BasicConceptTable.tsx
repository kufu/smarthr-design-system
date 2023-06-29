import { CSS_COLOR } from '@Constants/style'
import { graphql, useStaticQuery } from 'gatsby'
import { marked } from 'marked'
import React, { FC } from 'react'
import { Text } from 'smarthr-ui'
import styled from 'styled-components'

import { FragmentTitle } from '../../article/FragmentTitle/FragmentTitle'
import { TextUrlToLink } from '../shared/TextUrlToLink'

const query = graphql`
  query BasicConceptTable {
    basicConceptData: allSdsAirtable(filter: { table: { eq: "ライティングスタイル" } }) {
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

marked.setOptions({ headerIds: false, mangle: false })

export const BasicConceptTable: FC = () => {
  const data = useStaticQuery<Queries.BasicConceptTableQuery>(query)

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
      {basicConceptData[0].recordId?.includes('MOCKDATA') && (
        <WarningMessage>このページを正しく表示するにはAirtableのAPIキーの設定が必要です</WarningMessage>
      )}
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
  overflow-wrap: break-word;
`
const WarningMessage = styled.div`
  margin-block: 16px;
  padding: 16px;
  background-color: ${CSS_COLOR.CAUTION_LIGHT};
  color: ${CSS_COLOR.CAUTION_HEAVY};
  text-align: center;
`
