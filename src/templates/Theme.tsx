import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ThemeProvider as ShrThemeProvider, createTheme } from 'smarthr-ui'

const createdTheme = createTheme()

export const theme = {
  ...createdTheme,
  // TODO: smarthr-ui に PR 出す
  space: createdTheme.spacingByChar,
}

export const Theme: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StyledThemeProvider theme={theme}>
    <ShrThemeProvider theme={theme}>{children}</ShrThemeProvider>
  </StyledThemeProvider>
)
