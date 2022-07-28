import React, { FC, HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLImageElement>

export const StaticImage: FC<Props> = (props) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />
}
