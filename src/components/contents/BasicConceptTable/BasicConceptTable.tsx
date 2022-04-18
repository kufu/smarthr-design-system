import React, { VFC } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { Text } from 'smarthr-ui'
import { FragmentTitle } from '../../article/FragmentTitle/FragmentTitle'
import reactStringReplace from 'react-string-replace'

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
          }
        }
      }
    }
  }
`
export const BasicConceptTable: VFC = () => {
  const data = useStaticQuery<GatsbyTypes.BasicConceptTableQuery>(query)

  const basicConceptData = data.basicConceptData.edges
    .map(({ node }) => ({
      name: node.data?.name,
      description: node.data?.description,
      discussion: node.data?.discussion,
      source: node.data?.source,
      recordId: node.data?.record_id,
    }))
    .reverse()

  const getReplaceLinkText = (text: string) => {
    return (
      <Text as="p" whiteSpace="pre-wrap">
        {reactStringReplace(text, /(https?:\/\/\S+)/g, (match: string, strIndex: number) => {
          return (
            <a key={strIndex} href={match}>
              {match}
            </a>
          )
        })}
      </Text>
    )
  }
  return (
    <>
      {basicConceptData
        .filter((item) => {
          return item.name
        })
        .map(({ name, description, discussion, source, recordId }, index) => {
          const fragmentId = (suffixId: string) => {
            return recordId ? `${recordId}-${suffixId}` : ''
          }
          return (
            <Wrapper key={index}>
              <FragmentTitle tag="h2" id={fragmentId('0')}>
                {name}
              </FragmentTitle>
              {description && (
                <FragmentTitle tag="h3" id={fragmentId('1')}>
                  説明
                </FragmentTitle>
              )}
              {description && getReplaceLinkText(description)}
              {discussion && (
                <FragmentTitle tag="h3" id={fragmentId('2')}>
                  議事録
                </FragmentTitle>
              )}
              {discussion && getReplaceLinkText(discussion)}
              {source && (
                <FragmentTitle tag="h3" id={fragmentId('3')}>
                  出典
                </FragmentTitle>
              )}
              {source && getReplaceLinkText(source)}
            </Wrapper>
          )
        })}
    </>
  )
}

const Wrapper = styled.div``
