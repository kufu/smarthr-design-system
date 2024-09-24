import type { ReactNode } from 'react';
import { ThemeProvider as ShrThemeProvider, createTheme } from 'smarthr-ui';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const createdTheme = createTheme();

export const theme = {
  ...createdTheme,
  // TODO: smarthr-ui に PR 出す
  space: createdTheme.spacingByChar,
};

type Props = {
  children: ReactNode;
};

export default function Theme({ children }: Props) {
  return (
    <StyledThemeProvider theme={theme}>
      <ShrThemeProvider theme={theme}>{children}</ShrThemeProvider>
    </StyledThemeProvider>
  );
}
