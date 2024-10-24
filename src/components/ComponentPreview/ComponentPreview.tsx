import React, { type CSSProperties } from 'react';
import { Cluster } from 'smarthr-ui';

import WrapperBase from './WrapperBase';

import type { Gap, SeparateGap } from 'smarthr-ui/lib/types';

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
      {/* eslint-disable-next-line smarthr/best-practice-for-layouts */}
      <Cluster gap={gap} align={align}>
        {children}
      </Cluster>
    </WrapperBase>
  );
}
