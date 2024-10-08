import * as ui from 'smarthr-ui';
import { ThemeProvider } from 'styled-components';
import type { ComponentPreviewProps } from '.';
import ComponentPreview from '.';

const smarthrTheme = ui.createTheme();

export default function WithThemeProvider(props: ComponentPreviewProps) {
  return (
    <ThemeProvider theme={smarthrTheme}>
      <ComponentPreview {...props} />
    </ThemeProvider>
  );
}
