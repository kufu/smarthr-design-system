import { CSS_COLOR, CSS_FONT_SIZE } from '@Constants/style'
import { useLocation } from '@reach/router'
import { graphql, useStaticQuery } from 'gatsby'
import { marked } from 'marked'
import React, { FC, useEffect, useState } from 'react'
import { StatusLabel, Text, WarningIcon } from 'smarthr-ui'
import packageInfo from 'smarthr-ui/package.json'
import styled from 'styled-components'

import { FragmentTitle } from '../article/FragmentTitle/FragmentTitle'

type Props = {
  name: string
  showTitle?: boolean
}

const query = graphql`
  query PropsData {
    allUiVersion {
      nodes {
        version
        commitHash
        uiProps {
          displayName
          props {
            description
            name
            required
            type {
              name
              value {
                value
              }
            }
          }
        }
      }
    }
  }
`

const TYPE_COLOR = {
  string: '#1376a0',
  number: '#378445',
  boolean: '#a53f3f',
  literal: '#6e4ca6',
  func: '#76533e',
  other: '#4e4c49',
} as const

const pickType = (typeValue: string): keyof typeof TYPE_COLOR => {
  if (typeValue === 'string') return 'string'
  if (typeValue === 'number') return 'number'
  if (typeValue === 'true' || typeValue === 'false') return 'boolean'
  if (/^".*"$/g.test(typeValue)) return 'literal'
  if (/^\(.*\)\s*=>\s*.+$/g.test(typeValue)) return 'func' // 予約語を避けるため、これのみ省略
  return 'other'
}

const pickTypeColor = (value: string): string => {
  return TYPE_COLOR[pickType(value)]
}

marked.setOptions({ headerIds: false, mangle: false })

export const ComponentPropsTable: FC<Props> = ({ name, showTitle }) => {
  const { allUiVersion } = useStaticQuery<Queries.PropsDataQuery>(query)

  const [displayVersion, setDisplayVersion] = useState<string>(packageInfo.version)

  // クエリストリングのバージョン指定が変わったらPropsの内容も切り替える
  const location = useLocation()
  useEffect(() => {
    const { search } = location
    const params = new URLSearchParams(search)
    const version = params.get('v')
    setDisplayVersion(version || packageInfo.version)
  }, [location, displayVersion])

  const versionData =
    allUiVersion.nodes.find((node) => {
      // 指定されたバージョンかつsmarthr-ui-props.jsonが取得できているデータを探す
      return node.version === displayVersion && node.uiProps && node.uiProps.length > 0
    }) ||
    // 該当のデータがなければ最新バージョンのデータを表示する
    allUiVersion.nodes[0] ||
    // それもなければnullを返す（通常はありえない）
    null

  const data = versionData.uiProps?.filter((uiProp) => {
    return uiProp?.displayName === name
  })[0]
  const propsData = data ? data.props : []

  const fragmentId = (propsName: string) => {
    return `props-${propsName.replace(' ', '-')}`
  }
  if (propsData === null || propsData.length === 0) {
    return <Text as={'p'}>Propsは設定されていません。</Text>
  }

  return (
    <>
      {showTitle && (
        <FragmentTitle tag="h3" id={fragmentId(name)}>
          {name} props
        </FragmentTitle>
      )}
      {displayVersion !== versionData.version && <Text as={'p'}>{`v${versionData.version}の情報を表示しています。`}</Text>}
      <Wrapper>
        <>
          {propsData.map((prop) => (
            <PropContent key={prop?.name}>
              <PropName>
                <span>{prop?.name}</span>
                {prop?.required && <StatusLabel type="red">必須</StatusLabel>}
                {prop?.description?.includes('@deprecated') && <WarningIcon alt="非推奨" />}
              </PropName>
              <PropTypes>
                {prop?.type?.name === 'enum' ? (
                  prop?.type.value &&
                  prop.type.value.map((item, y) => {
                    return (
                      <TypeTag key={y} color={pickTypeColor(item?.value ?? '')}>
                        {item?.value}
                      </TypeTag>
                    )
                  })
                ) : (
                  <TypeTag color={pickTypeColor(prop?.type?.name ?? '')}>{prop?.type?.name}</TypeTag>
                )}
              </PropTypes>
              <PropDescription dangerouslySetInnerHTML={{ __html: marked.parse(prop?.description ?? '') }} />
            </PropContent>
          ))}
        </>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  border: 1px solid ${CSS_COLOR.SEMANTICS_BORDER};
  margin-top: 20px;
`
const PropContent = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px 24px;
  &:not(:last-child) {
    border-bottom: 1px solid ${CSS_COLOR.SEMANTICS_BORDER};
  }
`
const PropName = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;

  > span {
    margin-right: 8px;
  }
`
const PropTypes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`
const TypeTag = styled.span<{ color: string }>`
  font-size: ${CSS_FONT_SIZE.PX_14};
  color: ${CSS_COLOR.WHITE};
  padding: 4px 8px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
`
const PropDescription = styled.div`
  && p {
    margin-block-start: 0;
  }
`
