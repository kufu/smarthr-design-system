import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
}

export const TableWrapper: FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  overflow-x: auto;
`
