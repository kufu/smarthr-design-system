import 'styled-components';
import { createTheme } from 'smarthr-ui';

type Theme = ReturnType<typeof createTheme>;

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  export interface DefaultTheme extends Theme {}
}
