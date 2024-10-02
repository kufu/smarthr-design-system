import { type ReactNode } from 'react';
import { Header } from 'smarthr-ui';
import styled, { css } from 'styled-components';
import ResizableContainer from '../ResizableContainer';
import { WrapperBase } from './WrapperBase';

type Props = {
  children: ReactNode;
};

export default function ProductWrapper({ children }: Props) {
  return (
    <Wrapper>
      <ResizableContainer defaultWidth="100%" defaultHeight="300px">
        <BodyWrapper>
          <Header logoHref="#" />
          <Body>{children}</Body>
        </BodyWrapper>
      </ResizableContainer>
    </Wrapper>
  );
}

const Wrapper = styled(WrapperBase)(
  ({ theme: { leading } }) => css`
    border-width: 0 0 1px; /* CodeBlockには上ボーダーがないので、下のみボーダーをつける */

    /* FIXME: @scope が来たら書き直したい! */

    /* src/templates/article.tsx の無効化 */
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
