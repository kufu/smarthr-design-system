import { useMemo } from 'react';
import { Header, IntlProvider } from 'smarthr-ui';
import styled, { css } from 'styled-components';

import DefaultComponentPreview, { type ComponentPreviewProps } from '../ComponentPreview/ComponentPreview';
import WrapperBase from '../ComponentPreview/WrapperBase';
import ResizableContainer from '../ResizableContainer';

type Props = {
  layout?: 'none' | 'product';
} & ComponentPreviewProps;

export default function ComponentPreview({ layout, children, ...props }: Props) {
  return useMemo(() => {
    switch (layout) {
      default: {
        return <DefaultComponentPreview {...props}>{children}</DefaultComponentPreview>;
      }
      case 'product': {
        return (
          <IntlProvider locale="ja">
            <StyledWrapperBase>
              <ResizableContainer defaultWidth="100%" defaultHeight="300px">
                <BodyWrapper>
                  <Header logoHref="#" />
                  <Body>{children}</Body>
                </BodyWrapper>
              </ResizableContainer>
            </StyledWrapperBase>
          </IntlProvider>
        );
      }
      case 'none': {
        return (
          <IntlProvider locale="ja">
            <WrapperBase>{children}</WrapperBase>
          </IntlProvider>
        );
      }
    }
  }, [layout, props, children]);
}

// NOTE:
// iframe内に配置されるため引き続き styled-components を利用しています
const StyledWrapperBase = styled(WrapperBase)(
  ({ theme: { leading } }) => css`
    border-width: 0 0 1px !important; /* CodeBlockには上ボーダーがないので、下のみボーダーをつける */

    /* FIXME: @scope が来たら書き直したい! */

    /* ArticleLayoutで指定されているスタイルの無効化 */
    h2,
    h3,
    h4,
    h5,
    h2 + h5,
    p,
    ul,
    ol,
    table,
    table th,
    code {
      margin-block: revert;
      font-size: revert;
      line-height: revert;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: ${leading.TIGHT};
    }

    p {
      margin-block: 0;
      line-height: ${leading.NORMAL};
    }

    ul {
      list-style-type: none;
      padding-inline-start: unset;
    }

    /* FIXME!: プロダクトのスタイルを反映できていません。
     * line-height など継承されるスタイルを当てる必要があります。
     */
  `,
);

const padding = css(
  ({ theme: { space } }) => css`
    padding-inline: ${space(1.5)};

    @media (max-width: 1440px) {
      padding-inline: ${space(1.25)};
    }

    @media (max-width: 1024px) {
      padding-inline: ${space(1)};
    }

    @media (max-width: 768px) {
      padding-inline: ${space(0.75)};
    }

    @media (max-width: 480px) {
      padding-inline: ${space(0.5)};
    }
  `,
);

const Body = styled.div`
  ${padding}
`;

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;
