import { CSS_FONT_SIZE, CSS_SIZE } from '@Constants/style'
import React, { FC } from 'react'
import styled from 'styled-components'

import indexSearchLinkJson from '../../../data/indexSearchLink.json'

import { LinkItem } from './LinkItem'

type LinkItemObject = {
  title: string
  path: string
}

type LinkJsonObject = {
  page: LinkItemObject[]
  download: LinkItemObject[]
}

const data = indexSearchLinkJson as LinkJsonObject

export const SearchLink: FC = () => {
  return (
    <SearchContainer>
      <h2>ほしいものを探す</h2>
      <SearchLinks>
        <ul>
          {data.page.map((child, i) => {
            return (
              <li key={i}>
                <LinkItem data={child} />
              </li>
            )
          })}
        </ul>
        <ul>
          {data.download.map((child, i) => {
            return (
              <li key={i}>
                <LinkItem data={child} large={true} />
              </li>
            )
          })}
        </ul>
      </SearchLinks>
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  margin: 240px 0 0;
  text-align: center;
  > h2 {
    margin: 0;
    font-size: ${CSS_FONT_SIZE.PX_28};
    font-weight: bold;
    line-height: 1.3;
  }
  @media (width <= ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    margin-top: 120px;
  }
  @media (width <= ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    margin: 120px 16px 0;
  }
`

const SearchLinks = styled.div`
  max-width: 100%;
  margin: 120px 0 0;
  padding: 0;
  display: flex;
  align-content: center;
  align-items: stretch;
  justify-content: center;
  gap: 24px;
  > ul {
    list-style: none;
    max-width: 464px;
    margin: 0;
    padding: 0;
    flex-grow: 1;
    > li + li {
      margin-top: 8px;
    }
  }
  @media (width <= ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    margin: 56px 0 0;
    gap: 40px;
  }
  @media (width <= ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    flex-wrap: wrap;
    gap: 24px;
    > ul {
      width: 100%;
      max-width: 100%;
    }
  }
`
