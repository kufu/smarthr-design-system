import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  mdTable?: boolean
  children: React.ReactNode
}

export const TableWrapper: FC<Props> = ({ mdTable = false, children }) => {
  return <Wrapper>{mdTable ? <table>{children}</table> : children}</Wrapper>
}

const Wrapper = styled.div`
  overflow-x: auto;
`
