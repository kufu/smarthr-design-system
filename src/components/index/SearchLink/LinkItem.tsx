import React, { VFC } from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { CSS_COLOR, CSS_FONT_SIZE, CSS_SIZE } from '@Constants/style'

type LinkJsonObject = {
  title: string
  path: string
}

type ItemJsonType = LinkJsonObject

type Props = {
  data: ItemJsonType
  large?: boolean
}

export const LinkItem: VFC<Props> = ({ data, large }) => {
  return (
    <Wrapper $large={large === true}>
      <Link to={data.path}>
        <span>{data.title}</span>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div<{
  $large: boolean
}>(({ $large }) => {
  return css`
    height: 100%;
    > a {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: ${$large ? 152 : 72}px;
      padding: 8px 16px;
      border: solid 1px ${CSS_COLOR.LIGHT_GREY_1};
      border-radius: 12px;
      background-color: #fff;
      color: ${CSS_COLOR.TEXT_BLACK};
      font-size: ${CSS_FONT_SIZE.PX_16};
      line-height: 1.5;
      text-align: center;
      text-decoration: none;
      box-sizing: border-box;
      transition: background-color 1.5s cubic-bezier(0, 0.7, 0, 1);
      &:hover {
        transition: background-color 0.2s;
        background-color: ${CSS_COLOR.LIGHT_GREY_2};
        border-color: ${CSS_COLOR.TEXT_GREY};
      }
    }
    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
      > a {
        min-height: ${$large ? 96 : 64}px;
      }
    }
  `
})
