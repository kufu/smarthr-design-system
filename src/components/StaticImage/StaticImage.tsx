import React, { HTMLAttributes, VFC } from 'react'

type Props = HTMLAttributes<HTMLImageElement>

export const StaticImage: VFC<Props> = (props) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />
}
