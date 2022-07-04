import { addDecorator } from '@storybook/react'

import { ThemeProvider } from 'styled-components'
import { createTheme, ThemeProvider as ShrThemeProvider } from 'smarthr-ui'
import { CssBaseLine } from 'smarthr-normalize-css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
}

const theme = createTheme()

addDecorator((Story) => (
  <ThemeProvider theme={{ ...theme, space: theme.spacingByChar }}>
    <ShrThemeProvider theme={theme}>
      <CssBaseLine />
      <Story />
    </ShrThemeProvider>
  </ThemeProvider>
))
