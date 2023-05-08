import React, { FC } from 'react'
import styled, { css } from 'styled-components'

type Props = {
  type?: 'narrow' | ''
  mdTable?: boolean
  children: React.ReactNode
}

export const TableWrapper: FC<Props> = ({ type = '', mdTable = false, children }) => {
  return <Wrapper $type={type}>{mdTable ? <table>{children}</table> : children}</Wrapper>
}

const Wrapper = styled.div<{
  $type: string
}>`
  overflow-x: auto;
  ${({ $type }) =>
    $type === 'narrow' &&
    css`
      table th,
      table td {
        min-width: 2em;
      }
    `}
`
