import { CSS_COLOR } from '@Constants/style'
import { graphql, useStaticQuery } from 'gatsby'
import { marked } from 'marked'
import React, { FC } from 'react'
import { Text } from 'smarthr-ui'
import styled from 'styled-components'

import { FragmentTitle } from '../../article/FragmentTitle/FragmentTitle'
import { TextUrlToLink } from '../shared/TextUrlToLink'

const query = graphql`
  query IdiomaticAction {
    idiomaticAction: allSdsAirtable(filter: { table: { eq: "用語一覧：操作" } }) {
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

export const IdiomaticAction: FC = () => {
  const data = useStaticQuery<Queries.IdiomaticActionQuery>(query)

  const idiomaticAction = data.idiomaticAction.edges
    .map(({ node }) => ({
      name: node.data?.name,
      description: marked.parse(node.data?.description || ''),
      discussion: node.data?.discussion,
      source: node.data?.source,
      recordId: node.data?.record_id,
      order: node.data?.order || Number.MAX_SAFE_INTEGER,
    }))
    .filter((item) => item.name)
    .sort((x, y) => (x.order && y.order ? x.order - y.order : -1))

  return (
    <>
      {idiomaticAction[0].recordId?.includes('MOCKDATA') && (
        <WarningMessage>このページを正しく表示するにはAirtableのAPIキーの設定が必要です</WarningMessage>
      )}
      {idiomaticAction.map(({ name, description, discussion, source, recordId }, index) => {
        const generateFragmentId = (suffixId: string) => (recordId ? `${recordId}-${suffixId}` : `${index}-${suffixId}`)
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
