import React, { CSSProperties, useMemo } from 'react'
import { Cluster } from 'smarthr-ui'
import { Gap, SeparateGap } from 'smarthr-ui/lib/types'
import styled, { css } from 'styled-components'

import { ProductWrapper } from './ProductWrapper'
import { WrapperBase } from './WrapperBase'

type Props = {
  children: React.ReactNode
  gap?: Gap | SeparateGap
  align?: CSSProperties['alignItems']
  layout?: 'none' | 'product'
}

export const ComponentPreview = ({
  children,
  gap = 1,
  align = 'center', // 無指定で stretch されると困るため
  layout,
}: Props) =>
  useMemo(() => {
    switch (layout) {
      default: {
        return (
          <Wrapper>
            <Cluster gap={gap} align={align}>
              {children}
            </Cluster>
          </Wrapper>
        )
      }
      case 'product': {
        return <ProductWrapper>{children}</ProductWrapper>
      }
      case 'none': {
        return <NoLayoutWrapper>{children}</NoLayoutWrapper>
      }
    }
  }, [layout, align, children, gap])

const Wrapper = styled(WrapperBase)(
  ({ theme: { space } }) => css`
    padding: ${space(1.5)};
  `,
)
const NoLayoutWrapper = WrapperBase
