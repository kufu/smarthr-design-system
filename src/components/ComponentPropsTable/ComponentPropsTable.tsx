import { CSS_COLOR } from '@Constants/style'
import { marked } from 'marked'
import React, { FC } from 'react'
import { Text } from 'smarthr-ui'
import styled from 'styled-components'

import uiProps from '../../../smarthr-ui-props.json'
import { FragmentTitle } from '../article/FragmentTitle/FragmentTitle'

type Props = {
  name: string
  showTitle?: boolean
}

interface UIPropValue {
  value: string
  description?: string
  fullComment?: string
  tags?: { [key: string]: string }
}

interface UIProps {
  name: string
  required: boolean
  description: string
  defaultValue: { [key: string]: string } | null
  declarations: Array<{ fileName: string; name: string }>
  type: { name: string; raw?: string; value?: UIPropValue[] }
}

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
  if (/^\(.*\)\s*=>\s*.+$/g.test(typeValue)) return 'func'
  return 'other'
}

const pickTypeColor = (value: string): string => {
  return TYPE_COLOR[pickType(value)]
}

export const ComponentPropsTable: FC<Props> = ({ name, showTitle }) => {
  const data = uiProps.filter((uiProp) => {
    return uiProp.displayName === name
  })[0]
  const propsData: UIProps[] = data ? data.props : []
  const fragmentId = (propsName: string) => {
    return `props-${propsName.replace(' ', '-')}`
  }
  if (propsData.length === 0) {
    return <Text as={'p'}>Propsは設定されていません。</Text>
  }
  return (
    <Wrapper>
      {showTitle && (
        <PropTitle>
          <FragmentTitle tag="h3" id={fragmentId(name)}>
            {name} props
          </FragmentTitle>
        </PropTitle>
      )}
      <>
        {propsData.map((prop) => (
          <PropContent key={prop.name}>
            <PropName>
              {prop.name}
              {prop.required && <RequiredMark>*</RequiredMark>}
            </PropName>
            <PropTypes>
              {prop.type.name === 'enum' ? (
                prop.type.value &&
                prop.type.value.map((item, y) => {
                  return (
                    <TypeTag key={y} color={pickTypeColor(item.value)}>
                      {item.value}
                    </TypeTag>
                  )
                })
              ) : (
                <TypeTag color={pickTypeColor(prop.type.name)}>{prop.type.name}</TypeTag>
              )}
            </PropTypes>
            <PropDescription dangerouslySetInnerHTML={{ __html: marked.parse(prop.description) }} />
          </PropContent>
        ))}
      </>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid ${CSS_COLOR.LIGHT_GREY_4};
  border-radius: 4px;
  margin-top: 20px;
`
const PropTitle = styled.div`
  border-top-left-radius: 4px;
  padding: 8px 32px;
  background: ${CSS_COLOR.LIGHT_GREY_2};
  && h3 {
    margin: 0;
    font-size: 18px;
  }
`
const PropContent = styled.div`
  display: grid;
  gap: 8px;
  padding: 8px 32px;
  &:last-child {
    border-bottom-left-radius: 4px;
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${CSS_COLOR.LIGHT_GREY_4};
  }
`
const PropName = styled.div`
  padding-top: 8px;
  font-weight: bold;
`
const RequiredMark = styled.span`
  color: #bb1212;
`
const PropTypes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`
const TypeTag = styled.span<{ color: string }>`
  font-size: 0.8rem;
  color: ${CSS_COLOR.WHITE};
  padding: 4px 8px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
`
const PropDescription = styled.div``
