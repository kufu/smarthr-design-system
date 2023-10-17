import { CLOUDINARY_CLOUD_NAME } from '@Constants/application'
import { CSS_COLOR, CSS_FONT_SIZE, CSS_SIZE } from '@Constants/style'
import { Link } from 'gatsby'
import React, { useEffect, useMemo, useState } from 'react'
import { FaRedoIcon } from 'smarthr-ui'
import styled, { css } from 'styled-components'

import gotchaItemJson from '../../data/gotchaItem.json'

import type { FC } from 'react'

const BUTTON_TEXT: string = 'GOTCHA!' // アニメーションするため、css、reactのどちらでも必要なのでここで

const CLOUDINARY_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`

type GotchaItem = {
  image: string
  title: string
  alt: string
  links: Array<{ text: string; url: string }>
}

const gotchaItem = gotchaItemJson as GotchaItem[]

export const Gotcha: FC<unknown> = () => {
  // ランダムな画像＋説明文の表示をするため、SSR/CSRで表示内容が異なる可能性があり、コンソールにエラーが出る。
  // エラー回避のためSSR時はindexを固定し、CSR時のみ実行される`useEffect`内でランダムアイテムの選択を行う。
  const [currentItemIndex, setCurrentItemIndex] = useState(-1)
  const [nextItemIndex, setNextItemIndex] = useState(-1)
  useEffect(() => {
    const initialIndex = getRandomNum(gotchaItem.length, -1)
    setCurrentItemIndex(initialIndex)
    setNextItemIndex(getRandomNum(gotchaItem.length, initialIndex))
  }, [])

  const [isAnimated, setIsAnimated] = useState(false)

  let currentImgIsReady = false
  let nextImgIsReady = false

  const shouldDisabled: boolean = useMemo(() => currentImgIsReady && nextImgIsReady, [currentImgIsReady, nextImgIsReady])

  if (gotchaItem.length === 0) return null

  const runGotcha = (): void => {
    //ボタンが押されたらアニメーションする
    setIsAnimated(true)
  }

  const finishAnimation = (): void => {
    setCurrentItemIndex(nextItemIndex)

    //画像の入れ替えが終わっていないとチラつくことがあるので、200ms待つ。
    setTimeout(() => {
      //アニメーション開始位置に要素を戻しておく
      setIsAnimated(false)

      //次の画像を読み込んでおく
      loadNextImage()
    }, 200)
  }

  const loadNextImage = (): void => {
    const randomNum = getRandomNum(gotchaItem.length, nextItemIndex)
    const nextImg = new Image()
    nextImg.onload = () => {
      nextImgIsReady = true
    }
    nextImgIsReady = false
    nextImg.srcset = `
      ${CLOUDINARY_URL}f_auto/w_2720/sds/${gotchaItem[randomNum].image} 2720w,
      ${CLOUDINARY_URL}f_auto/w_1536/sds/${gotchaItem[randomNum].image} 1536w,
      ${CLOUDINARY_URL}f_auto/w_768/sds/${gotchaItem[randomNum].image} 768w
    `
    nextImg.src = `${CLOUDINARY_URL}f_auto/sds/${gotchaItem[randomNum].image}`
    nextImg.sizes = '(min-width: 1024px) 2720px, 100vw'
    setNextItemIndex(randomNum)
  }

  const currentImgOnLoad = (): void => {
    currentImgIsReady = true
  }

  const nextImgOnload = (): void => {
    nextImgIsReady = true
  }

  return (
    <Wrapper>
      <GotchaMain>
        <ImageContainer className={isAnimated ? 'runAnimation' : ''} aria-busy={isAnimated}>
          {/* 次の画像 */}
          {nextItemIndex > -1 && (
            <img
              srcSet={`
                ${CLOUDINARY_URL}f_auto/w_2720/sds/${gotchaItem[nextItemIndex].image} 2720w,
                ${CLOUDINARY_URL}f_auto/w_1536/sds/${gotchaItem[nextItemIndex].image} 1536w,
                ${CLOUDINARY_URL}f_auto/w_768/sds/${gotchaItem[nextItemIndex].image} 768w
              `}
              src={`${CLOUDINARY_URL}f_auto/sds/${gotchaItem[nextItemIndex].image}`}
              width="1272"
              height="352"
              sizes="(min-width: 1024px) 2720px, 100vw"
              alt={gotchaItem[nextItemIndex].alt}
              aria-hidden="true"
              onLoad={() => nextImgOnload()}
            />
          )}
          {/* 表示中の画像 */}
          {currentItemIndex > -1 && (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
              srcSet={`
                ${CLOUDINARY_URL}f_auto/w_2720/sds/${gotchaItem[currentItemIndex].image} 2720w,
                ${CLOUDINARY_URL}f_auto/w_1536/sds/${gotchaItem[currentItemIndex].image} 1536w,
                ${CLOUDINARY_URL}f_auto/w_768/sds/${gotchaItem[currentItemIndex].image} 768w
              `}
              src={`${CLOUDINARY_URL}f_auto/sds/${gotchaItem[currentItemIndex].image}`}
              sizes="(min-width: 1024px) 2720px, 100vw"
              width="1272"
              height="352"
              alt={gotchaItem[currentItemIndex].alt}
              onAnimationEnd={() => finishAnimation()}
              onLoad={() => currentImgOnLoad()}
            />
          )}
        </ImageContainer>
        {/* ガチャボタン */}
        <GotchaButton type="button" onClick={() => runGotcha()} disabled={shouldDisabled}>
          <FaRedoIcon />
          <span className="animatedText">
            {Array.from(BUTTON_TEXT).map((letter, index) => (
              <span key={index} className={`animatedLetter letter-${index}`}>
                {letter}
              </span>
            ))}
          </span>
        </GotchaButton>

        {/* 活用事例ラベル */}
        <Label>活用事例</Label>
      </GotchaMain>

      {/* 関連リンク */}
      {currentItemIndex > -1 && (
        <GotchaLinks>
          <p>{gotchaItem[currentItemIndex].title}</p>
          <ul>
            {gotchaItem[currentItemIndex].links.map((link, index) => (
              <li key={index}>
                <Link to={link.url}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </GotchaLinks>
      )}
    </Wrapper>
  )
}
type GetRandomNum = (length: number, currentNum: number) => number
const getRandomNum: GetRandomNum = (length, currentNum) => {
  if (length === 0) return 0
  if (length === 1) return 0

  let randomNum = Math.floor(Math.random() * length) // 0 ~ length未満の整数

  // 前回と同じ番号は避ける
  while (randomNum === currentNum) {
    randomNum = getRandomNum(length, currentNum)
  }

  return randomNum
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  img {
    display: block;
    width: 100%;
  }
`
const GotchaMain = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1272 / 352;
  @supports not (aspect-ratio: 1272 / 352) {
    height: calc((100vw - 160px) / 1272 * 352);
    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
      height: calc((100vw - 32px) / 1272 * 352);
    }
    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
      height: calc(100vw / 1272 * 352);
    }
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: ${CSS_COLOR.SMARTHR_BLUE};
  overflow: hidden;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px ${CSS_COLOR.SMARTHR_BLUE};
    border-radius: 4px;
    box-sizing: border-box;
  }
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    border-radius: 0;
    &::after {
      border-radius: 0;
      border-left: none;
      border-right: none;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translateY(-100%);
  }
  &.runAnimation {
    img {
      animation: bounce-animation 0.2s ease-out forwards;
    }
  }
  @keyframes bounce-animation {
    0% {
      transform: translateY(-100%);
    }
    40% {
      transform: translateY(8%);
    }
    100% {
      transform: translateY(0);
    }
  }
`

const GotchaButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  color: ${CSS_COLOR.TEXT_BLACK};
  background-color: white;
  border: 2px solid ${CSS_COLOR.SMARTHR_BLUE};
  border-radius: 8px;
  width: 112px;
  height: 36px;
  padding: 0;
  position: absolute;
  bottom: -4px;
  left: 40px;
  font-weight: bold;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    bottom: -27px;
  }

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    right: 16px;
    left: auto;
  }

  &:active {
    animation: 0.6s ease 0s gotcha;
  }

  .animatedText {
    overflow: hidden;
    text-shadow: 0 var(--font-shadow) 0 var(--text);
  }

  .animatedLetter {
    display: inline-block;
    backface-visibility: hidden;
    font-style: normal;
    transition: transform var(--duration) ease;
    transform: translateY(var(--m)) translateZ(0);
  }
  &:hover .animatedLetter {
    --m: calc(var(--font-size) * -1);
  }

  &:disabled {
    color: ${CSS_COLOR.LIGHT_GREY_1};
    border-color: ${CSS_COLOR.LIGHT_GREY_1};
    pointer-events: none;
    cursor: pointer;
    .animatedLetter {
      --m: 0;
      color: ${CSS_COLOR.LIGHT_GREY_1};
    }
  }

  ${() =>
    Array.from(BUTTON_TEXT).map(
      (_, index) => css`
        .letter-${index} {
          transition-delay: ${index / 35}s;
        }
      `,
    )}

  @keyframes gotcha {
    0% {
      transform: translateY(0);
    }
    12% {
      transform: translateY(7px);
    }
    24% {
      transform: translateY(8px);
    }
    36% {
      transform: translateY(9.2px);
    }
    54% {
      transform: translateY(9.6px) scaleY(0.98);
    }
    74% {
      transform: translateY(9.8px) scaleY(0.95);
    }
    82% {
      transform: translateY(10px) scaleY(0.9);
    }
    96% {
      transform: translateY(9.5px);
    }
    98% {
      transform: translateY(-8px) scaleY(1.2);
    }
    100% {
      transform: translateY(1px);
    }
  }

  --background: ${CSS_COLOR.WHITE};
  --text: ${CSS_COLOR.TEXT_BLACK};
  --font-size: ${CSS_FONT_SIZE.PX_14};
  --duration: 0.15s;
  --move-hover: 8px;
  --font-shadow: var(--font-size);
`

const GotchaLinks = styled.div`
  position: absolute;
  color: ${CSS_COLOR.TEXT_GREY};
  font-size: ${CSS_FONT_SIZE.PX_11};
  top: calc(100% + 22px);
  left: 40px;
  width: 20%;
  max-width: 232px;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    top: calc(100% + 46px);
  }
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    width: auto;
    max-width: 100%;
    position: relative;
    margin: 48px 32px auto;
    left: auto;
  }
  > p {
    margin: 0 0 4px;
    font-weight: bold;
  }
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    color: ${CSS_COLOR.TEXT_GREY};
    &:hover {
      opacity: 0.8;
    }
  }
`
const Label = styled.p`
  &::before {
    content: '';
    display: block;
    background-color: ${CSS_COLOR.SMARTHR_BLUE};
    width: 100%;
    height: 4px;
    margin-bottom: 8px;
    border-radius: 0 0 2px 2px;
  }
  position: absolute;
  right: 40px;
  top: 100%;
  margin: 0;
  margin-top: -2px;
  color: ${CSS_COLOR.TEXT_GREY};
  font-weight: bold;
  font-size: ${CSS_FONT_SIZE.PX_12};
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    left: 32px;
    right: auto;
  }
`
