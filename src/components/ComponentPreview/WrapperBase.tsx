import styled, { css } from 'styled-components'

export const WrapperBase = styled.div(
  ({ theme: { border, color, spacingByChar } }) => css`
    margin-block-start: ${spacingByChar(1)};
    border: ${border.shorthand};
    background-color: ${color.WHITE};
    font-family: system-ui, sans-serif;
  `,
)
