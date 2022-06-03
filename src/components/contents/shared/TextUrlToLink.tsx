import React, { VFC } from 'react'
import reactStringReplace from 'react-string-replace'

type Props = {
  text: string
}

export const TextUrlToLink: VFC<Props> = ({ text }) => {
  return (
    <>
      {reactStringReplace(text, /(https?:\/\/\S+)/g, (match: string, strIndex: number) => {
        return (
          <a key={strIndex} href={match}>
            {match}
          </a>
        )
      })}
    </>
  )
}
