import { CSS_COLOR, CSS_FONT_SIZE, CSS_SIZE } from '@Constants/style'
import React, { FC } from 'react'
import styled from 'styled-components'

import { FloatingTextLink } from '../../shared/FloatingTextLink'

export const Introduction: FC = () => {
  return (
    <>
      <IntroductionContainer>
        <StyledHeading>
          <span>だれでも・</span>
          <span>効率よく・</span>
          <span>迷わずに。</span>
        </StyledHeading>
        <StyledText>
          <span>SmartHR Design Systemは、</span>
          <span>すべての人によりよい体験を届けるためのデザインシステムです。</span>
          <span>SmartHRに関わる人はどなたでも利用・参加できます。</span>
        </StyledText>
        <StyledText>
          <FloatingTextLink path="/concept/">デザインシステムとは？（コンセプト）</FloatingTextLink>
        </StyledText>
      </IntroductionContainer>
      <IndexImageContainer>
        <img
          src="/images/index_introduction_illust.png"
          width="320"
          height="180"
          alt="こちらに手をふる人々。SmartHR社の人物や、そうでない人たち、そしてかわいいねこ。"
        />
      </IndexImageContainer>
    </>
  )
}

const IntroductionContainer = styled.div`
  width: 70%;
  margin: 0 0 0 auto;
  @media (width <= ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    box-sizing: border-box;
    width: 100%;
    max-width: 420px;
    padding: 0 16px;
    margin-left: 0;
  }
  @media (width <= ${CSS_SIZE.BREAKPOINT_MOBILE_1}) {
    margin: 0;
  }
`

const StyledHeading = styled.h1`
  font-size: ${CSS_FONT_SIZE.PX_54};
  font-weight: normal;
  margin: 0 0 24px;
  line-height: 1.25;
  letter-spacing: 0.1rem;
  word-break: normal;
  > span {
    display: inline-block;
  }
  @media (width <= ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    font-size: ${CSS_FONT_SIZE.PX_48};
    line-height: 1.5;
  }
`

const StyledText = styled.p`
  font-size: ${CSS_FONT_SIZE.PX_20};
  font-weight: normal;
  margin: 0 0 24px auto;
  line-height: 1.9;
  word-break: normal;
  letter-spacing: 1.5px;
  > span {
    display: inline-block;
  }
  @media (width <= ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    font-size: ${CSS_FONT_SIZE.PX_16};
    line-height: 2;
    > span {
      display: inline;
    }
  }
`

const IndexImageContainer = styled.div`
  margin: 20px 0 0;
  padding: 0 16px;
  > img {
    display: block;
    margin: 0 0 0 auto;
    max-width: 50%;
    height: auto;
  }
  @media (width <= ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    margin: 72px 0 120px;
    border-bottom: solid 1px ${CSS_COLOR.LIGHT_GREY_1};
    > img {
      max-width: 192px;
    }
  }
  @media (width <= ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    margin: 80px 0 0;
    padding: 0;
    > img {
      margin: 0 auto;
      max-width: 50%;
    }
  }
`
