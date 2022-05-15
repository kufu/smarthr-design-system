import React from 'react'
import styled, { css } from 'styled-components'
import { Cluster, SmartHRLogo } from 'smarthr-ui'

import { WrapperBase } from './WrapperBase'

export const ProductWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Wrapper>
    <Header>
      <SmartHRLogo />
    </Header>
    <Body>{children}</Body>
  </Wrapper>
)

const Wrapper = styled(WrapperBase)(
  ({ theme: { color } }) => css`
    background-color: ${color.BACKGROUND};

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

    p {
      margin-block: 0;
    }

    /* FIXME!: プロダクトのスタイルを反映できていません。
     * line-height など継承されるスタイルを当てる必要があります。
     */
  `,
)
const padding = css(
  ({ theme: { spacingByChar } }) => css`
    padding-inline: ${spacingByChar(1.5)};

    @media (max-width: 1440px) {
      padding-inline: ${spacingByChar(1.25)};
    }
    @media (max-width: 1024px) {
      padding-inline: ${spacingByChar(1)};
    }
    @media (max-width: 768px) {
      padding-inline: ${spacingByChar(0.75)};
    }
    @media (max-width: 480px) {
      padding-inline: ${spacingByChar(0.5)};
    }
  `,
)
const Header = styled(Cluster).attrs({ forwardedAs: 'header' })`
  ${({ theme: { color, spacingByChar } }) => css`
    background-color: ${color.BRAND};
    padding-block: ${spacingByChar(0.75)};
    ${padding}

    @media (max-width: 768px) {
      padding-block: ${spacingByChar(0.5)};
    }
  `}
`
const Body = styled.div`
  ${padding}
`
