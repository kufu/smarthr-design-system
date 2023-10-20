import { CSS_COLOR, CSS_FONT_SIZE, CSS_SIZE } from '@Constants/style'
import { Link } from 'gatsby'
import React, { FC } from 'react'
import { Section } from 'smarthr-ui'
import styled from 'styled-components'

import { FloatingTextLink } from '../../shared/FloatingTextLink'

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

type ItemJsonType = IndexJsonObject

type Props = {
  data: ItemJsonType
}

export const Category: FC<Props> = ({ data }) => (
  <NavigationSection>
    <NavigationText>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <FloatingTextLink path={data.path}>もっと詳しく</FloatingTextLink>
    </NavigationText>
    <NavigationLinksContainer>
      {data.imagePath ? (
        <CategoryImageWrapper>
          <Link to={data.path}>
            <img src={data.imagePath} width="832" height="144" alt="基本原則" />
          </Link>
        </CategoryImageWrapper>
      ) : (
        <NavigationLinks>
          {data.items.map((item, i) => (
            <li key={i}>
              <Link to={item.path}>
                <ThumbnailImageWrapper>
                  {/* この画像はリンクテキストと同等の内容なので、altは空が適切 */}
                  {/* eslint-disable-next-line smarthr/a11y-image-has-alt-attribute */}
                  <img src={item.imagePath} width="262" height="144" alt="" />
                </ThumbnailImageWrapper>
                <p>{item.title}</p>
              </Link>
            </li>
          ))}
        </NavigationLinks>
      )}
    </NavigationLinksContainer>
  </NavigationSection>
)

const NavigationSection = styled(Section)`
  display: flex;
  gap: 40px;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    display: block;
    gap: 0;
  }
`

const NavigationText = styled.div`
  width: 320px;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    width: 100%;
  }
  h2 {
    margin: 0;
    font-size: ${CSS_FONT_SIZE.PX_28};
    font-weight: bold;
    line-height: 1.3;
  }
  p {
    margin: 8px 0 24px;
    font-size: ${CSS_FONT_SIZE.PX_16};
    line-height: 2.125;
  }
`

const NavigationLinksContainer = styled.div`
  width: 832px;
  max-width: 100%;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    margin-top: 40px;
  }
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    width: 100%;
  }
`

const ThumbnailImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 144px;
  aspect-ratio: 261 / 144;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${CSS_COLOR.LIGHT_GREY_1};
  box-sizing: border-box;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    background-color: ${CSS_COLOR.LIGHT_GREY_4}00;
    transition: background-color 1.5s cubic-bezier(0, 0.7, 0, 1);
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    max-height: 100%;
  }
`

const NavigationLinks = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    display: block;
  }
  > li {
    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
      &:not(:first-child) {
        margin-top: 24px;
      }
    }
    > a {
      display: block;
      text-decoration: none;
      > p {
        margin: 8px 0 0;
        color: ${CSS_COLOR.TEXT_BLACK};
        font-size: ${CSS_FONT_SIZE.PX_14};
        font-weight: bold;
        line-height: 1.3;
      }
      &:hover {
        ${ThumbnailImageWrapper} {
          border-color: ${CSS_COLOR.TEXT_GREY};
          &::after {
            width: 100%;
            height: 100%;
            background-color: ${CSS_COLOR.LIGHT_GREY_4}55; /* 55=アルファ0.15 */
            transition: background-color 0.2s;
          }
        }
      }
    }
  }
`

const CategoryImageWrapper = styled.div`
  width: 100%;
  height: 144px;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    width: auto;

    /*
      画面幅いっぱいにするためにvwを使用する。
      祖先要素の要素のどこかで
      overflow: hidden;を指定しないと横スクロールバーが発生する
    */
    margin-inline: calc(50% - 50vw);
    border-radius: 0;
  }
  a {
    display: block;
    position: relative;
    height: 100%;
    border: 1px solid ${CSS_COLOR.LIGHT_GREY_1};
    border-radius: 4px;
    box-sizing: border-box;
    overflow: hidden;
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      background-color: ${CSS_COLOR.LIGHT_GREY_4}00;
      transition: background-color 1.5s cubic-bezier(0, 0.7, 0, 1);
    }
    &:focus {
      outline-offset: -4px;
    }
    &:hover {
      border-color: ${CSS_COLOR.TEXT_GREY};
      &::after {
        width: 100%;
        height: 100%;
        background-color: ${CSS_COLOR.LIGHT_GREY_4}55; /* 55=アルファ0.15 */
        transition: background-color 0.2s;
      }
    }
    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
      border-left: 0;
      border-right: 0;
      border-radius: 0;
    }
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
