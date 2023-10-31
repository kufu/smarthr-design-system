import React, { FC, HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLImageElement>

export const StaticImage: FC<Props> = (props) => (
  // eslint-disable-next-line smarthr/a11y-image-has-alt-attribute, jsx-a11y/alt-text
  <img {...props} />
)
