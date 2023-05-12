import { RoundedBoxLink } from '@Components/shared/RoundedBoxLink'
import { CSS_FONT_SIZE, CSS_SIZE } from '@Constants/style'
import React, { FC } from 'react'
import styled from 'styled-components'

type FaqJsonObject = {
  question: string
  answer: string
  path: string
  linkLabel: string
}

type ItemJsonType = FaqJsonObject

type Props = {
  data: ItemJsonType
}

export const FaqItem: FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <QuestionText>{data.question}</QuestionText>
      <AnswerText>{data.answer}</AnswerText>
      <RoundedBoxLink path={data.path} label="もっと詳しく" title={data.linkLabel} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: block;
  text-align: left;
`

const QuestionText = styled.h3`
  margin: 0;
  font-size: ${CSS_FONT_SIZE.PX_28};
  line-height: 1.5;
  font-weight: normal;
  @media (width <= ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    font-size: ${CSS_FONT_SIZE.PX_24};
  }
`

const AnswerText = styled.p`
  margin: 8px 0 24px;
  font-size: ${CSS_FONT_SIZE.PX_16};
  line-height: 1.75;
`
