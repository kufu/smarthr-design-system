import { createTheme } from 'smarthr-ui';

type FontSizeKey = keyof ReturnType<typeof createTheme>['fontSize'];

type Props = {
  size?: FontSizeKey;
  children: string;
};

export default function SampleText({ size = 'M', children }: Props) {
  const theme = createTheme();
  const fontSize = theme.fontSize[size];

  return <p style={{ fontSize }}>{children}</p>;
}
