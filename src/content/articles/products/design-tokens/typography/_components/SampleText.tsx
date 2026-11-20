import { createTheme } from 'smarthr-ui';

import type { CreatedFontSizeTheme } from 'smarthr-ui/lib/themes/createFontSize';

type Props = {
  size?: keyof CreatedFontSizeTheme;
  children: string;
};

export default function SampleText({ size = 'M', children }: Props) {
  const theme = createTheme();
  const fontSize = theme.fontSize[size];

  return <p style={{ fontSize }}>{children}</p>;
}
