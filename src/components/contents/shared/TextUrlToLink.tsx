import React, { FC } from 'react'
import reactStringReplace from 'react-string-replace'

type Props = {
  text: string
}

export const TextUrlToLink: FC<Props> = ({ text }) => {
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
