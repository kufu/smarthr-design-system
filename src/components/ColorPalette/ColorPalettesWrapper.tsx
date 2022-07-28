import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
}

export const ColorPalettesWrapper: FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-block: 24px 0;
`
