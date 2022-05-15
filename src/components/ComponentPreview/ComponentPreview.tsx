import React, { CSSProperties, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { Cluster } from 'smarthr-ui'
import { Gap, SeparateGap } from 'smarthr-ui/lib/components/Layout/type'

import { WrapperBase } from './WrapperBase'
import { ProductWrapper } from './ProductWrapper'

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
  }, [layout])

const Wrapper = styled(WrapperBase)(
  ({ theme: { spacingByChar } }) => css`
    padding: ${spacingByChar(1.5)};
  `,
)
const NoLayoutWrapper = WrapperBase
