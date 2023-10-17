import { CSS_COLOR } from '@Constants/style'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { marked } from 'marked'
import React, { FC } from 'react'
import { Cluster, Table, Td, Text, Th } from 'smarthr-ui'
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
            order
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

  type IdiomaticUsageData = {
    label?: string | null
    ngExample?: string | null
    okExample?: string | null
    reason?: string[] | null
    recordId?: string | null
  }

  const idiomaticUsageData = data.idiomaticUsageData.edges
    .map(({ node }) => ({
      label: node.data?.label,
      ngExample: node.data?.ng_example,
      okExample: node.data?.ok_example,
      reason: node.data?.reason?.map((reason) => reason ?? ''),
      recordId: node.data?.record_id,
    }))
    .sort((x, y) => (x.label && y.label ? x.label.localeCompare(y.label, 'ja') : -1))

  const charIndexList = ['あ行', 'か行', 'さ行', 'た行', 'な行', 'は行', 'ま行', 'や行', 'ら行', 'わ行', '記号・その他']

  // 文字がひらがなのどの行にあるかを判定する関数
  const findIndexChar = (labelChar: string) => {
    // ひらがなで始まっていない場合は記号・その他に分類
    if (!labelChar.match(/[あ-ん]/)) return '記号・その他'
    const index =
      charIndexList.findIndex((indexChar) => labelChar.localeCompare(indexChar.charAt(0), 'ja') < 0) - 1
    return charIndexList[index]
  }
  const indexedUsageData: { [key in (typeof charIndexList)[number]]: IdiomaticUsageData[] } = {}
  idiomaticUsageData.forEach((item) => {
    const indexChar = findIndexChar(item.label?.charAt(0) || '')
    if (!indexedUsageData[indexChar]) indexedUsageData[indexChar] = []

    indexedUsageData[indexChar].push(item)
  })

  const idiomaticUsageReason = data.idiomaticUsageReason.edges
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
      {idiomaticUsageData[0].recordId?.includes('MOCKDATA') && (
        <WarningMessage>このページを正しく表示するにはAirtableのAPIキーの設定が必要です</WarningMessage>
      )}
      {type === 'data' && (
        <>
          <Cluster gap={'S'}>
            {charIndexList.map((char) => (
                <a key={char} href={`#${char}`}>
                  {char}
                </a>
              ))}
          </Cluster>
          {charIndexList.map((char) => (
              <React.Fragment key={char}>
                <FragmentTitle id={`${char}`} tag="h3">
                  {char}
                </FragmentTitle>
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
                      {indexedUsageData[char]?.map((prop, index) => {
                        const matchReason = idiomaticUsageReason.find(
                          (reason) => prop.reason && prop.reason.includes(reason.recordId ?? ''),
                        )

                        return (
                          <tr key={index}>
                            <RecommendTd>
                              <strong>
                                {prop.okExample?.split(/(\u3000)/).map((word, wordIndex) => 
                                  // 全角スペース（u3000）があれば改行に変換
                                   word === '　' ? <br key={wordIndex} /> : word
                                )}
                              </strong>
                            </RecommendTd>
                            <NGTd>
                              {prop.ngExample?.split(/(\u3000)/).map((word, wordIndex) => word === '　' ? <br key={wordIndex} /> : word)}
                            </NGTd>
                            <ReasonTd>
                              <ul>
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
              </React.Fragment>
            ))}
        </>
      )}
      {type === 'reason' && (
        <>
          {idiomaticUsageReason.map(({ name, description, discussion, source, recordId }, index) => {
            const generateFragmentId = (suffixId: string) => recordId ? `${recordId}-${suffixId}` : `${index}-${suffixId}`

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
