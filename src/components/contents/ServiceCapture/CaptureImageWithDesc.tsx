import { CSS_COLOR, CSS_FONT_SIZE } from '@Constants/style'
import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  description?: string
  children: React.ReactNode
}

export const CaptureImageWithDesc: FC<Props> = ({ description, children }) => {
  return (
    <Figure>
      {children}
      {description && <figcaption>{description}</figcaption>}
    </Figure>
  )
}

const Figure = styled.figure`
  display: block;
  margin: 0;
  padding: 0;
  p {
    height: 208px;
    background-color: ${CSS_COLOR.DIVIDER};
  }
  a {
    display: block;
    height: 208px;
  }
  span {
    /*
      マークダウンの画像で一緒に挿入されるspanタグのstyle属性に直接padding-bottomが指定され、
      サイズが調整できないため、やむなく!importantを指定
    */
    padding-bottom: 0 !important;
  }
  img {
    /*
      マークダウンの画像はstyle属性に直接「box-shadow: white 0px 0px 0px 400px inset;」が指定されて、
      背景色が強制的に白にさせられてしまうため、背景色を入れるためにやむなく!importantを指定
    */
    box-shadow: none !important;
    object-fit: contain;
  }
  figcaption {
    margin-top: 16px;
    font-size: ${CSS_FONT_SIZE.PX_13};
    line-height: 1.62;
    color: #000;
  }
`
