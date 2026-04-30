import { Cluster } from 'smarthr-ui';

import WrapperBase from './WrapperBase';

import type { CSSProperties, ReactNode } from 'react';
import type { Gap, SeparateGap } from 'smarthr-ui/types';

export type ComponentPreviewProps = {
  children: ReactNode;
  gap?: Gap | SeparateGap;
  align?: CSSProperties['alignItems'];
};

export default function ComponentPreview({
  children,
  gap = 1,
  align = 'center', // 無指定で stretch されると困るため
}: ComponentPreviewProps) {
  return (
    <WrapperBase style={{ padding: '1.5em' }}>
      <Cluster gap={gap} align={align}>
        {children}
      </Cluster>
    </WrapperBase>
  );
}
