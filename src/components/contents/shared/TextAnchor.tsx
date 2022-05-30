import React, { VFC } from 'react'
import styled from 'styled-components'
import { Text } from 'smarthr-ui'
import reactStringReplace from 'react-string-replace'

type Props = {
  text: string
}

export const TextAnchor: VFC<Props> = ({ text }) => {
  return (
    <StyledText as="p">
      {reactStringReplace(text, /(https?:\/\/\S+)/g, (match: string, strIndex: number) => {
        return (
          <a key={strIndex} href={match}>
            {match}
          </a>
        )
      })}
    </StyledText>
  )
}

const StyledText = styled(Text)`
  white-space: pre-wrap;
  word-wrap: break-word;
`
