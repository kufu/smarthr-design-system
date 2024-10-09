import React, { type CSSProperties } from 'react';
import { Cluster } from 'smarthr-ui';
import type { Gap, SeparateGap } from 'smarthr-ui/lib/types';
import WrapperBase from './WrapperBase';

export type ComponentPreviewProps = {
  children: React.ReactNode;
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
