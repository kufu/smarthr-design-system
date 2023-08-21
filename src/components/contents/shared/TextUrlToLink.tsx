import { CustomLink } from '@Components/article/CustomLink'
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
          <CustomLink key={strIndex} href={match}>
            {match}
          </CustomLink>
        )
      })}
    </>
  )
}
