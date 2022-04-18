import React, { VFC } from 'react'
import styled from 'styled-components'
import { CSS_COLOR } from '../../constants/style'

type Props = {
  children: React.ReactNode
}

export const ComponentPreview: VFC<Props> = (props) => {
  return <Wrapper>{props.children}</Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  margin-block: 16px 0;
  padding: 3rem 1rem;
  gap: 1rem;
  border: 1px solid ${CSS_COLOR.SEMANTICS_BORDER};
  font-family: system-ui, sans-serif;

  > * {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`
