import { createTheme } from 'smarthr-ui';

import type { FontSizes } from 'smarthr-ui/lib/themes/createFontSize';

type Props = {
  size?: FontSizes;
  children: string;
};

export default function SampleText({ size = 'M', children }: Props) {
  const theme = createTheme();
  const fontSize = theme.fontSize[size];

  return <p style={{ fontSize }}>{children}</p>;
}
