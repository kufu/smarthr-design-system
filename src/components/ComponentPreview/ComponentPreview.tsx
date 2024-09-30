import React, { type CSSProperties, useMemo } from 'react';
import { Cluster } from 'smarthr-ui';
import type { Gap, SeparateGap } from 'smarthr-ui/lib/types';
import styled, { css } from 'styled-components';

import { ProductWrapper } from './ProductWrapper';
import { WrapperBase } from './WrapperBase';

type Props = {
  children: React.ReactNode;
  gap?: Gap | SeparateGap;
  align?: CSSProperties['alignItems'];
  layout?: 'none' | 'product';
};

export const ComponentPreview = ({
  children,
  gap = 1,
  align = 'center', // 無指定で stretch されると困るため
  layout,
}: Props) => {
  return useMemo(() => {
    switch (layout) {
      default: {
        return (
          <Wrapper>
            <Cluster gap={gap} align={align}>
              {children}
            </Cluster>
          </Wrapper>
        );
      }
      case 'product': {
        return <ProductWrapper>{children}</ProductWrapper>;
      }
      case 'none': {
        return <NoLayoutWrapper>{children}</NoLayoutWrapper>;
      }
    }
  }, [layout, align, children, gap]);
};

// NOTE:
// このコンポーネントは components/article/CodeBlock/LiveContainer で iframe 内に配置されるため、
// CSS Modules を使わずに styled-components を利用しています
//
// 理由は次の通りです
// - CSS Modules を使った場合、iframe 内に CSS を引き継ぐ必要がある
// - LiveContainer 内で styled-components を使っているため、CSS Modules へ移行する必要性があまりない
const Wrapper = styled(WrapperBase)(
  ({ theme: { space } }) => css`
    padding: ${space(1.5)};
  `,
);

const NoLayoutWrapper = WrapperBase;
