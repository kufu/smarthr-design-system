import React, { VFC } from 'react'
import styled from 'styled-components'
import { CSS_SIZE } from '@Constants/style'

import { Category } from './Category'

import indexContentJson from '../../../data/indexContent.json'

type IndexJsonItem = {
  title: string
  path: string
  imagePath: string
}

type IndexJsonObject = {
  title: string
  description: string
  path: string
  imagePath: string
  items: IndexJsonItem[]
}

const data = indexContentJson as IndexJsonObject[]

export const ContentNavigation: VFC = () => {
  return (
    <IndexNavigationContainer>
      {data.map((child, i) => {
        return (
          <li key={i}>
            <Category data={child} />
          </li>
        )
      })}
    </IndexNavigationContainer>
  )
}

const IndexNavigationContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  > li {
    display: block;
    &:not(:first-child) {
      margin-top: 104px;
    }
  }
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    margin: 80px 16px 0;
    > li:not(:first-child) {
      margin-top: 80px;
    }
  }
`
