import React, { CSSProperties, VFC } from 'react'
import styled from 'styled-components'
import { Cluster } from 'smarthr-ui'
import { Gap, SeparateGap } from 'smarthr-ui/lib/components/Layout/type'
import { CSS_COLOR } from '../../constants/style'

type Props = {
  children: React.ReactNode
  gap?: Gap | SeparateGap
  align?: CSSProperties['alignItems']
}

export const ComponentPreview: VFC<Props> = ({
  children,
  gap = 1,
  align = 'center', // 無指定で stretch されると困るため
}) => (
  <Wrapper>
    <Cluster gap={gap} align={align}>
      {children}
    </Cluster>
  </Wrapper>
)

const Wrapper = styled.div`
  background-color: white;
  margin-block-start: 16px;
  border: 1px solid ${CSS_COLOR.SEMANTICS_BORDER};
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
`
