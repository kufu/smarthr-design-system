import { CSS_COLOR } from '@Constants/style'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { marked } from 'marked'
import React, { FC } from 'react'
import { Table, Td, Text, Th } from 'smarthr-ui'
import styled from 'styled-components'

import { FragmentTitle } from '../../article/FragmentTitle/FragmentTitle'
import { TableWrapper } from '../shared/TableWrapper'
import { TextUrlToLink } from '../shared/TextUrlToLink'

const query = graphql`
  query IdiomaticUsageTable {
    idiomaticUsageData: allSdsAirtable(filter: { table: { eq: "用字用語：一覧" } }) {
      edges {
        node {
          data {
            label
            ng_example
            ok_example
            expected
            reason
            record_id
          }
        }
      }
    }
    idiomaticUsageReason: allSdsAirtable(filter: { table: { eq: "用字用語：理由" } }) {
      edges {
        node {
          data {
            name
            description
            discussion
            source
            record_id
            data
            order
          }
        }
      }
    }
    writingStyle: allSdsAirtable(filter: { table: { eq: "ライティングスタイル" } }) {
      edges {
        node {
          data {
            name
            data
            record_id
          }
        }
      }
    }
  }
`

type Props = {
  type: 'data' | 'reason'
}

marked.setOptions({ headerIds: false, mangle: false })

export const IdiomaticUsageTable: FC<Props> = ({ type }) => {
  const data = useStaticQuery<Queries.IdiomaticUsageTableQuery>(query)

  const idiomaticUsageData = data.idiomaticUsageData.edges
    .map(({ node }) => ({
      label: node.data?.label,
      ngExample: node.data?.ng_example,
      okExample: node.data?.ok_example,
      reason: node.data?.reason,
      recordId: node.data?.record_id,
    }))
    .sort((x, y) => (x.label && y.label ? x.label.localeCompare(y.label, 'ja') : -1))

  const idiomaticUsageReason = data.idiomaticUsageReason.edges
    .map(({ node }) => ({
      name: node.data?.name,
      description: marked.parse(node.data?.description || ''),
      discussion: node.data?.discussion,
      source: node.data?.source,
      recordId: node.data?.record_id,
      data: node.data?.data,
      order: node.data?.order || Number.MAX_SAFE_INTEGER,
    }))
    .filter((item) => {
      return item.name
    })
    .sort((x, y) => (x.order && y.order ? x.order - y.order : -1))

  const writingStyle = data.writingStyle.edges
    .map(({ node }) => ({
      name: node.data?.name,
      data: node.data?.data, // 用字用語：一覧からのデータ参照
      recordId: node.data?.record_id,
    }))
    .sort((x, y) => (x.name && y.name ? x.name.localeCompare(y.name, 'ja') : -1))

  return (
    <>
      {idiomaticUsageData[0].recordId?.includes('MOCKDATA') && (
        <WarningMessage>このページを正しく表示するにはAirtableのAPIキーの設定が必要です</WarningMessage>
      )}
      {type === 'data' && (
        <Wrapper>
          <Table>
            <thead>
              <tr>
                <RecommendTh>推奨する表記</RecommendTh>
                <NGTh>NG例</NGTh>
                <ReasonTh>理由</ReasonTh>
              </tr>
            </thead>
            <tbody>
              {idiomaticUsageData.map((prop, index) => {
                const matchReason = idiomaticUsageReason.find(
                  (reason) => prop.reason && prop.reason.includes(reason.recordId ?? ''),
                )
                const matchWritingStyle = writingStyle.find((style) => style.data && style.data.includes(prop.recordId ?? ''))

                // recordId: "recWCPX1UhchVaFjO"
                // "平仮名にしたほうが読みやすい漢字は平仮名にする"
                // console.log(writingStyle)

                return (
                  <tr key={index}>
                    <RecommendTd>
                      <strong>
                        {prop.okExample?.split(/(\u3000)/).map((word) => {
                          // 全角スペース（u3000）があれば改行に変換
                          return word === '　' ? <br /> : word
                        })}
                      </strong>
                    </RecommendTd>
                    <NGTd>
                      {prop.ngExample?.split(/(\u3000)/).map((word) => {
                        return word === '　' ? <br /> : word
                      })}
                    </NGTd>
                    <ReasonTd>
                      <ul>
                        {matchWritingStyle && (
                          <li>
                            <Link to={`/products/contents/writing-style/#${matchWritingStyle.recordId}-0`}>
                              {matchWritingStyle.name}
                            </Link>
                          </li>
                        )}
                        {matchReason && (
                          <li>
                            <Link to={`/products/contents/idiomatic-usage/usage/#${matchReason.recordId}-0`}>
                              {matchReason.name}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </ReasonTd>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Wrapper>
      )}
      {type === 'reason' && (
        <>
          {idiomaticUsageReason.map(({ name, description, discussion, source, recordId }, index) => {
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
      )}
    </>
  )
}

const Wrapper = styled(TableWrapper)`
  & th,
  td {
    vertical-align: baseline;
  }
`
const RecommendTh = styled(Th)`
  white-space: nowrap;
`
const NGTh = styled(Th)`
  min-width: 11em;
  width: 22em;
`
const ReasonTh = styled(Th)`
  min-width: 22em;
  width: auto;
`
const RecommendTd = styled(Td)`
  white-space: nowrap;
`
const NGTd = styled(Td)`
  min-width: 11em;
  width: 22em;
`
const ReasonTd = styled(Td)`
  min-width: 22em;
  width: auto;
`
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
