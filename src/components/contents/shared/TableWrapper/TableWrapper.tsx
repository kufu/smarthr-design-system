import { useTableShadow } from '@Components/contents/shared/TableWrapper/useTableShadow'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'

type Props = {
  type?: 'narrow' | ''
  mdTable?: boolean
  children: React.ReactNode
}

export const TableWrapper: FC<Props> = ({ type = '', mdTable = false, children }) => {
  const { tableWrapperRef, showLeftShadow, showRightShadow } = useTableShadow()
  return (
    <TableShadow showLeft={showLeftShadow} showRight={showRightShadow}>
      <Wrapper $type={type} ref={tableWrapperRef}>
        {mdTable ? <table>{children}</table> : children}
      </Wrapper>
    </TableShadow>
  )
}

const tableShadowStyles = css`
  content: '';
  position: absolute;
  z-index: 1;
  inset-block: 0;
  width: 20px;
  pointer-events: none; /* 影の領域が広すぎるとクリッカブルエリアを侵食するので無効化 */
  transition: opacity 0.2s;
`

const TableShadow = styled.div<{
  showLeft: boolean
  showRight: boolean
}>`
  position: relative;

  &::before {
    ${tableShadowStyles};
    left: 0;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
    opacity: ${({ showLeft }) => (showLeft ? 1 : 0)};
  }
  &::after {
    ${tableShadowStyles};
    right: 0;
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
    opacity: ${({ showRight }) => (showRight ? 1 : 0)};
  }
`

const Wrapper = styled.div<{
  $type: string
}>`
  position: relative;
  overflow: auto;
  margin-block: 20px 0;

  && table {
    margin-block: 0; /* シャドウがマージンにまで影響するため、Wrapperで上マージンを確保し、table自身の上マージンは解除する */
  }

  ${({ $type }) =>
    $type === 'narrow' &&
    css`
      table th,
      table td {
        min-width: 2em;
      }
    `}
`
