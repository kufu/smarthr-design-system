import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  gap?: string
  size?: string
  autoRepeat?: 'auto-fit' | 'auto-fill'
  children: React.ReactNode
}

export const Grid: FC<Props> = ({ gap = '24px', size = '344px', autoRepeat = 'auto-fit', children }) => {
  return (
    <Wrapper gap={gap} size={size} autoRepeat={autoRepeat}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ gap?: string; size?: string; autoRepeat?: string }>`
  display: grid;
  margin-top: 24px;
  gap: ${({ gap }) => gap};
  grid-template-columns: repeat(${({ autoRepeat }) => autoRepeat}, minmax(${({ size }) => size}, 1fr));

  /* グリッドアイテム内の1つの要素の上マージンを消す */
  & > * > :first-child {
    margin-top: 0;
  }
`
