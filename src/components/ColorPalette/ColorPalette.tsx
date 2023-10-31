import React, { FC } from 'react'
import { defaultBreakpoint } from 'smarthr-ui'
import styled, { css } from 'styled-components'

// source: https://gist.github.com/danieliser/b4b24c9f772066bcf0a6
const convertHexToRGBA = (colorValue: string): string => {
  let hex = colorValue && colorValue.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgb(${r},${g},${b})`
}

type Props = {
  colorName: string
  colorValue: string
  description: string
}

export const ColorPalette: FC<Props> = ({ colorName, colorValue, description }) => (
  <Wrapper>
    <Thumbnail $color={colorValue}></Thumbnail>
    <Informations>
      <ColorName>{colorName}</ColorName>

      {colorValue.startsWith('#') ? (
        <>
          <ColorCode>{colorValue}</ColorCode>
          <ColorCode>{convertHexToRGBA(colorValue)}</ColorCode>
        </>
      ) : (
        <ColorCode>{colorValue}</ColorCode>
      )}
      <Description>{description}</Description>
    </Informations>
  </Wrapper>
)

const Wrapper = styled.div`
  width: calc(25% - 24px);
  height: auto;

  @media (max-width: ${defaultBreakpoint.SP}px) {
    width: calc(50% - 24px);
  }
`

const Thumbnail = styled.div<{
  $color: string
}>(
  ({ $color }) => css`
    width: 100%;
    height: 128px;
    margin-bottom: 12px;
    background-color: ${$color};
    box-shadow: rgb(235, 236, 240) 0 0 0 1.2px;
  `,
)

const Informations = styled.div``
const ColorName = styled.div`
  font-weight: bold;
  word-break: break-all;
`
const ColorCode = styled.div`
  word-break: break-all;
`
const Description = styled.p`
  word-break: break-all;
`
