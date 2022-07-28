import React, { FC } from 'react'
import styled from 'styled-components'
import { Table, Td, Text, Th } from 'smarthr-ui'
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

export const ComponentPropsTable: FC<Props> = ({ name, showTitle }) => {
  const data = uiProps.filter((uiProp) => {
    return uiProp.displayName === name
  })[0]
  const propsData: UIProps[] = data ? data.props : []
  const fragmentId = (propsName: string) => {
    return `props-${propsName.replace(' ', '-')}`
  }
  return (
    <>
      {showTitle && (
        <FragmentTitle tag="h3" id={fragmentId(name)}>
          {name} props
        </FragmentTitle>
      )}

      {propsData.length > 0 ? (
        <Wrapper>
          <Table>
            <thead>
              <tr>
                <NameTh>Name</NameTh>
                <RequiredTh>Required</RequiredTh>
                <TypeTh>Type</TypeTh>
                <DescriptionTh>Description</DescriptionTh>
              </tr>
            </thead>
            <tbody>
              {propsData.map((prop, i) => {
                return (
                  <tr key={i}>
                    <NameTd>
                      <strong>{prop.name}</strong>
                    </NameTd>
                    <RequiredTd>{prop.required ? 'true' : '-'}</RequiredTd>
                    <TypeTd>
                      {prop.type.name === 'enum' ? (
                        prop.type.value &&
                        prop.type.value.map((item, y, array) => {
                          return (
                            <React.Fragment key={y}>
                              <code>{item.value}</code>
                              {array.length - 1 !== y ? ',\n' : null}
                            </React.Fragment>
                          )
                        })
                      ) : (
                        <code>{prop.type.name}</code>
                      )}
                    </TypeTd>
                    <DescriptionTd>{prop.description}</DescriptionTd>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Wrapper>
      ) : (
        <Text as={'p'}>Propsは設定されていません。</Text>
      )}
    </>
  )
}

const Wrapper = styled.div`
  overflow-x: auto;
  & th,
  td {
    vertical-align: baseline;
  }
`
const NameTh = styled(Th)`
  white-space: nowrap;
`
const RequiredTh = styled(Th)`
  white-space: nowrap;
`
const TypeTh = styled(Th)`
  min-width: 11em;
  width: 22em;
  & code {
    white-space: nowrap;
  }
`
const DescriptionTh = styled(Th)`
  min-width: 22em;
  width: auto;
`
const NameTd = styled(Td)`
  white-space: nowrap;
`
const RequiredTd = styled(Td)`
  white-space: nowrap;
`
const TypeTd = styled(Td)`
  min-width: 11em;
  width: 22em;
  & code {
    white-space: nowrap;
  }
`
const DescriptionTd = styled(Td)`
  min-width: 22em;
  width: auto;
`
