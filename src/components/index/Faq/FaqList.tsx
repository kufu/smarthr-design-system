import React, { FC } from 'react'
import styled from 'styled-components'
import { CSS_FONT_SIZE, CSS_SIZE } from '@Constants/style'

import { FaqItem } from './FaqItem'

import indexFaqJson from '../../../data/indexFaq.json'

type FaqJsonObject = {
  question: string
  answer: string
  path: string
  linkLabel: string
}

type ItemJsonType = FaqJsonObject

const data = indexFaqJson as ItemJsonType[]

export const FaqList: FC = () => {
  return (
    <IndexFaqContainer>
      <h2>よくあるご質問</h2>
      <ul>
        {data.map((item, i) => {
          return (
            <li key={i}>
              <FaqItem data={item}></FaqItem>
            </li>
          )
        })}
      </ul>
    </IndexFaqContainer>
  )
}

const IndexFaqContainer = styled.div`
  margin: 240px 0 0;
  text-align: center;
  > h2 {
    margin: 0;
    font-size: ${CSS_FONT_SIZE.PX_28};
    font-weight: bold;
    line-height: 1.3;
  }
  > ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 80px 68px;
    margin: 120px 0 0;
    padding: 0;
    > li {
      width: 352px;
      max-width: calc((100% - 68px) / 2);
      margin: 0;
      padding: 0;
    }
  }
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    margin-top: 120px;
    > ul {
      gap: 56px 40px;
      margin: 56px 0 0;
      padding: 0;
      > li {
        max-width: calc((100% - 40px) / 2);
      }
    }
  }
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    margin: 120px 16px 0;
    > ul > li {
      width: 100%;
      max-width: 100%;
    }
  }
`
