import React, { VFC } from 'react'
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

export const ComponentPropsTable: VFC<Props> = ({ name, showTitle }) => {
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
                <Th>Name</Th>
                <Th>Required</Th>
                <Th>Type</Th>
                <Th>Description</Th>
              </tr>
            </thead>
            <tbody>
              {propsData.map((prop, i) => {
                return (
                  <tr key={i}>
                    <NameCell>
                      <strong>{prop.name}</strong>
                    </NameCell>
                    <RequiredCell>{prop.required ? 'true' : '-'}</RequiredCell>
                    <TypeCell>
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
                    </TypeCell>
                    <DescriptionCell>{prop.description}</DescriptionCell>
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
const NameCell = styled(Td)`
  white-space: nowrap;
`
const RequiredCell = styled(Td)`
  white-space: nowrap;
`
const TypeCell = styled(Td)`
  min-width: 11em;
  width: 22em;
  & code {
    white-space: nowrap;
  }
`
const DescriptionCell = styled(Td)`
  min-width: 22em;
  width: auto;
`
