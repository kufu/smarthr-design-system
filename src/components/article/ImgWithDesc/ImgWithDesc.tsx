import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  description: string
  children: React.ReactNode
}

export const ImgWithDesc: FC<Props> = ({ description, children }) => (
    <Figure>
      {children}
      <figcaption>{description}</figcaption>
    </Figure>
  )

const Figure = styled.figure`
  display: block;
  margin: 0;
  padding: 0;

  figcaption {
    margin-top: 16px;
    font-size: 13px;
    line-height: 1.62;
    color: #000;
  }
`
