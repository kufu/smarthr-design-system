import React, { VFC } from 'react'
import styled from 'styled-components'
import { Body, Cell, Head, Row, Table, Text } from 'smarthr-ui'
import uiProps from '../../../smarthr-ui-props.json'
import { FragmentTitle } from '../article/FragmentTitle/FragmentTitle'

type Props = {
  name: string
  showTitle?: boolean
}

export const ComponentPropsTable: VFC<Props> = ({ name, showTitle }) => {
  const data = uiProps.filter((uiProp) => {
    return uiProp.displayName === name
  })[0]
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

      {data && data.props.length > 0 ? (
        <Wrapper>
          <Table>
            <Head>
              <Row>
                <NameCell>Name</NameCell>
                <RequiredCell>Required</RequiredCell>
                <TypeCell>Type</TypeCell>
                <DescriptionCell>Description</DescriptionCell>
              </Row>
            </Head>
            <Body>
              {data.props.map((prop, i) => {
                return (
                  <Row key={i}>
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
                  </Row>
                )
              })}
            </Body>
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
const NameCell = styled(Cell)`
  white-space: nowrap;
`
const RequiredCell = styled(Cell)`
  white-space: nowrap;
`
const TypeCell = styled(Cell)`
  min-width: 11em;
  width: 22em;
  & code {
    white-space: nowrap;
  }
`
const DescriptionCell = styled(Cell)`
  min-width: 22em;
  width: auto;
`
