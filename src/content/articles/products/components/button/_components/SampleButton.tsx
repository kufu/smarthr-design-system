import type { ReactNode } from 'react';
import { Button } from 'smarthr-ui';

// NOTE:
// Astro では ReactNode を直接 Props で受け取れないので、ReactNode を返す関数として受け取っています
type Props = {
  Prefix?: () => ReactNode;
  Suffix?: () => ReactNode;
} & Omit<React.ComponentProps<typeof Button>, 'prefix' | 'suffix'>;

export default function SampleButton({ Prefix, Suffix, ...props }: Props) {
  return <Button {...props} prefix={Prefix ? <Prefix /> : undefined} suffix={Suffix ? <Suffix /> : undefined} />;
}
