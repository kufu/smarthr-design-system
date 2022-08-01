import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import Color from 'color'
import { defaultBreakpoint, defaultColor } from 'smarthr-ui'

// soruce: https://gist.github.com/danieliser/b4b24c9f772066bcf0a6
const convertHexToRGBA = (hexCode: string): string => {
  let hex = hexCode && hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r},${g},${b})`
}

type Props = {
  hexCode: string
  colorName: string
  description: string
}

export const ColorPalette: FC<Props> = ({ colorName, hexCode, description }) => {
  return (
    <Wrapper>
      <Thumbnail $color={hexCode}></Thumbnail>
      <Informations>
        <ColorName>{colorName}</ColorName>
        <ColorCode>{hexCode}</ColorCode>
        <ColorCode>{convertHexToRGBA(hexCode)}</ColorCode>
        {/* <ColorContrast fgColor={hexCode} bgColor={defaultColor.BACKGROUND} /> */}
        <Description>{description}</Description>
      </Informations>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: calc(25% - 24px);
  height: auto;

  @media (max-width: ${defaultBreakpoint.SP}px) {
    width: calc(50% - 24px);
  }
`

const Thumbnail = styled.div<{
  $color: string
}>(({ $color }) => {
  return css`
    width: 100%;
    height: 128px;
    margin-bottom: 12px;
    background-color: ${$color};
    box-shadow: rgb(235, 236, 240) 0 0 0 1.2px;
  `
})

const Informations = styled.div``
const ColorName = styled.div`
  font-weight: bold;
  word-break: break-all;
`
const ColorCode = styled.div`
  word-break: break-all;
`
const ColorContrast: FC<{ fgColor: string; bgColor: string }> = ({ fgColor, bgColor }) => {
  const contrastRatio = Math.round(Color(convertHexToRGBA(fgColor)).contrast(Color(convertHexToRGBA(bgColor))) * 100) / 100
  const score = contrastRatio >= 7 ? 'AAA' : contrastRatio >= 4.5 ? 'AA' : contrastRatio >= 3 ? 'AA+' : 'Fail'

  return <p>{`${contrastRatio} (${score})`}</p>
}

const Description = styled.p`
  word-break: break-all;
`
