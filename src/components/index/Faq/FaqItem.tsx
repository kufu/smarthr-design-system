import React, { VFC } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { CSS_COLOR, CSS_FONT_SIZE, CSS_SIZE } from '../../../constants/style'

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

export const FaqItem: VFC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <QuestionText>{data.question}</QuestionText>
      <AnswerText>{data.answer}</AnswerText>
      <DetailLink to={data.path}>
        <p>もっと詳しく</p>
        <StyledText>
          <span>{data.linkLabel}</span>
        </StyledText>
      </DetailLink>
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
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    font-size: ${CSS_FONT_SIZE.PX_24};
  }
`

const AnswerText = styled.p`
  margin: 8px 0 0;
  font-size: ${CSS_FONT_SIZE.PX_16};
  line-height: 1.75;
`

const DetailLink = styled(Link)`
  display: block;
  margin: 24px 0 0;
  padding: 24px;
  border: solid 1px ${CSS_COLOR.LIGHT_GREY_1};
  border-radius: 12px;
  font-size: ${CSS_FONT_SIZE.PX_14};
  font-weight: bold;
  line-height: 1.4;
  text-decoration: none;
  transition: background-color 1.5s cubic-bezier(0, 0.7, 0, 1);
  > p {
    margin: 0 0 8px;
    letter-spacing: 0.1rem;
    color: ${CSS_COLOR.TEXT_BLACK};
  }
  &:hover {
    transition: background-color 0.2s;
    background-color: ${CSS_COLOR.LIGHT_GREY_2};
    border-color: ${CSS_COLOR.TEXT_GREY};
  }
`

const StyledText = styled.div`
  display: block;
  color: ${CSS_COLOR.MAIN_DARKEN};
  > span {
    display: inline-block;
    position: relative;
    padding-right: 1.8em;
    border-bottom: solid 1px currentColor;
    ${DetailLink}:hover & {
      border-bottom-color: transparent;
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 0.8em;
      height: 0.8em;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1Ljg3MiA3LjMzNzAzTDAgMC42MDMwMjdWMi4wODUwM0wxNC4yNiA4LjAxMzAzTDAgMTMuOTE1VjE1LjM5N0wxNS44NzIgOC42NjMwM1Y3LjMzNzAzWiIgZmlsbD0iIzAwNjVBOSIvPgo8L3N2Zz4K');
      background-size: contain;
      background-repeat: no-repeat;
      transition: transform 1.5s cubic-bezier(0, 0.7, 0, 1);
      ${DetailLink}:hover & {
        transition: transform 0.2s;
        transform: translateY(-50%) translateX(4px);
      }
    }
  }
`
