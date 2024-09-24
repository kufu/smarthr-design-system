import { CSS_COLOR, CSS_FONT_SIZE, CSS_SIZE } from '@/constants/style';
import type { ReactNode } from 'react';
import { Article as UIArticle } from 'smarthr-ui';
import styled from 'styled-components';

type Props = {
  title: string;
  children: ReactNode;
};

export default function Article({ title, children }: Props) {
  return (
    <Wrapper>
      <Main>
        <MainArticle>
          <div>
            <MainArticleTitle>
              <h1>{title}</h1>
            </MainArticleTitle>

            <MDXStyledWrapper>{children}</MDXStyledWrapper>
          </div>
        </MainArticle>
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > header {
    flex: 0 0 auto;
  }

  & > footer {
    flex: 0 0 auto;
  }
`;

const Main = styled.main`
  flex: 1 1 auto;
  display: grid;
  grid-template: 'sidebar article index' auto / 1fr minmax(auto, 712px) 1fr;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_PC_1}) {
    grid-template: 'sidebar article .' auto / 1fr minmax(auto, 712px) minmax(40px, 1fr);
  }

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    grid-template:
      'sidebar sidebar sidebar'
      'index index index'
      '. article .'
      / minmax(40px, 1fr) minmax(auto, 712px) minmax(40px, 1fr);
    margin-top: 0;
  }
`;

const MainArticle = styled(UIArticle)`
  grid-area: article;
  min-width: 0;
  padding-top: 112px;
  padding-bottom: 240px;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    padding-bottom: 112px;
  }
`;

const MainArticleTitle = styled.div`
  & > h1 {
    margin: 0;
    font-size: ${CSS_FONT_SIZE.PX_52};
    line-height: 1.32;
  }
`;

/* MarkDownで書き出されるコンテンツ用のスタイル */
const MDXStyledWrapper = styled.div`
  padding-block-start: 40px;

  > *:first-child {
    margin-block-start: 0;
  }

  /* 画像 */
  img {
    max-width: 100%;
  }

  /* Level2 */
  h2 {
    font-size: ${CSS_FONT_SIZE.PX_36};
    line-height: 1.22;
    margin-block: 120px 0;
    font-weight: bold;
  }

  /* Level3 */
  h3 {
    font-size: ${CSS_FONT_SIZE.PX_26};
    line-height: 1.38;
    margin-block: 80px 0;
  }

  /* Level4 */
  h4 {
    font-size: ${CSS_FONT_SIZE.PX_18};
    line-height: 1.56;
    margin-block: 60px 0;
  }

  /* Level5 */
  h5 {
    font-size: ${CSS_FONT_SIZE.PX_16};
    line-height: 1.76;
    margin-block: 40px 0;
  }

  /* 連続する見出し */
  h2 + h3 {
    margin-block: 20px 0;
  }
  h3 + h4,
  h4 + h5 {
    margin-block: 16px 0;
  }

  /* 本文 */
  p {
    font-size: ${CSS_FONT_SIZE.PX_16};
    line-height: 2.12;
    margin-block: 20px 0;
  }

  /* リスト */
  ul,
  ol {
    font-size: ${CSS_FONT_SIZE.PX_16};
    line-height: 2.12;
    margin-block: 20px 0;
    padding-inline-start: 2.5em;

    ul,
    ol {
      margin-block-start: 0;
    }
  }

  /* 表組み */
  table {
    margin-block: 20px 0;
    width: 100%;

    th {
      height: 2.5rem;
      vertical-align: middle;
      font-size: ${CSS_FONT_SIZE.PX_14};
      background-color: ${CSS_COLOR.DIVIDER};
    }

    td {
      p:first-child,
      ul:first-child,
      ol:first-child {
        margin-block-start: 0;
      }
    }
  }

  code {
    padding: 0.125rem 0.25rem;
    border-radius: 4px;
    background-color: ${CSS_COLOR.LIGHT_GREY_2};
    font-size: ${CSS_FONT_SIZE.PX_14};
    vertical-align: 0.05rem;
    margin: 0.125rem;
  }

  /* 動画 */
  .youtube {
    aspect-ratio: 16/9;
    width: 100%;
    max-width: 100%;
  }
`;
