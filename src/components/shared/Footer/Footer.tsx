import { CSS_COLOR, CSS_FONT_SIZE, CSS_SIZE } from '@Constants/style'
import { Link, graphql, useStaticQuery } from 'gatsby'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'

import { FootStaticLinks } from './FootStaticLinks'

type Props = {
  isArticlePage?: boolean
}
const query = graphql`
  query Footer {
    concept: allMdx(
      filter: { fields: { category: { eq: "concept" }, hierarchy: { glob: "*/*" } } }
      sort: { fields: frontmatter___order }
    ) {
      nodes {
        id
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
    foundation: allMdx(
      filter: { fields: { category: { eq: "foundation" }, hierarchy: { glob: "*/*" } } }
      sort: { fields: frontmatter___order }
    ) {
      nodes {
        id
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
    basics: allMdx(
      filter: { fields: { category: { eq: "basics" }, hierarchy: { glob: "*/*" } } }
      sort: { fields: frontmatter___order }
    ) {
      nodes {
        id
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
    accessibility: allMdx(
      filter: { fields: { category: { eq: "accessibility" }, hierarchy: { glob: "*/*" } } }
      sort: { fields: frontmatter___order }
    ) {
      nodes {
        id
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
    products: allMdx(
      filter: { fields: { category: { eq: "products" }, hierarchy: { glob: "*/*" } } }
      sort: { fields: frontmatter___order }
    ) {
      nodes {
        id
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
    communication: allMdx(
      filter: { fields: { category: { eq: "communication" }, hierarchy: { glob: "*/*" } } }
      sort: { fields: frontmatter___order }
    ) {
      nodes {
        id
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`
export const Footer: FC<Props> = ({ isArticlePage = false }) => {
  const {
    concept: { nodes: concept },
    foundation: { nodes: foundation },
    basics: { nodes: basics },
    accessibility: { nodes: accessibility },
    products: { nodes: products },
    communication: { nodes: communication },
  } = useStaticQuery<GatsbyTypes.FooterQuery>(query)
  return (
    <Wrapper isArticlePage={isArticlePage}>
      <LayoutContainer isArticlePage={isArticlePage}>
        <Col1Container>
          <StyledLogo>SmartHR Design System</StyledLogo>
          <FootStaticLinks />
        </Col1Container>

        <Col2Container>
          <div>
            <StyledH3>
              <StyledLink to="/concept/">コンセプト</StyledLink>
            </StyledH3>
            {concept.length > 0 && (
              <StyledUl>
                {concept.map(({ fields, frontmatter }) => {
                  if (fields?.slug === undefined) return null
                  if (frontmatter?.title === undefined) return null
                  return (
                    <li key={fields.slug}>
                      <StyledLink to={fields.slug}>{frontmatter.title}</StyledLink>
                    </li>
                  )
                })}
              </StyledUl>
            )}
            <StyledH3>
              <StyledLink to="/foundation/">基本原則</StyledLink>
              {foundation.length > 0 && (
                <StyledUl>
                  {foundation.map(({ fields, frontmatter }) => {
                    if (fields?.slug === undefined) return null
                    if (frontmatter?.title === undefined) return null
                    return (
                      <li key={fields.slug}>
                        <StyledLink to={fields.slug}>{frontmatter.title}</StyledLink>
                      </li>
                    )
                  })}
                </StyledUl>
              )}
            </StyledH3>
          </div>
          <div>
            <StyledH3>
              <StyledLink to="/basics/">基本要素</StyledLink>
            </StyledH3>
            {basics.length > 0 && (
              <StyledUl>
                {basics.map(({ fields, frontmatter }) => {
                  if (fields?.slug === undefined) return null
                  if (frontmatter?.title === undefined) return null
                  return (
                    <li key={fields.slug}>
                      <StyledLink to={fields.slug}>{frontmatter.title}</StyledLink>
                    </li>
                  )
                })}
              </StyledUl>
            )}
            <StyledH3>
              <StyledLink to="/accessibility/">アクセシビリティ</StyledLink>
            </StyledH3>
            {accessibility.length > 0 && (
              <StyledUl>
                {accessibility.map(({ fields, frontmatter }) => {
                  if (fields?.slug === undefined) return null
                  if (frontmatter?.title === undefined) return null
                  return (
                    <li key={fields.slug}>
                      <StyledLink to={fields.slug}>{frontmatter.title}</StyledLink>
                    </li>
                  )
                })}
              </StyledUl>
            )}
          </div>
          <div>
            <StyledH3>
              <StyledLink to="/products/">プロダクト</StyledLink>
            </StyledH3>
            {products.length > 0 && (
              <StyledUl>
                {products.map(({ fields, frontmatter }) => {
                  if (fields?.slug === undefined) return null
                  if (frontmatter?.title === undefined) return null
                  return (
                    <li key={fields.slug}>
                      <StyledLink to={fields.slug}>{frontmatter.title}</StyledLink>
                    </li>
                  )
                })}
              </StyledUl>
            )}
          </div>
          <div>
            <StyledH3>
              <StyledLink to="/communication/">コミュニケーション</StyledLink>
            </StyledH3>
            {communication.length > 0 && (
              <StyledUl>
                {communication.map(({ fields, frontmatter }) => {
                  if (fields?.slug === undefined) return null
                  if (frontmatter?.title === undefined) return null
                  return (
                    <li key={fields.slug}>
                      <StyledLink to={fields.slug}>{frontmatter.title}</StyledLink>
                    </li>
                  )
                })}
              </StyledUl>
            )}
          </div>
        </Col2Container>

        <CopyrightContainer>
          <StyledCopyright>
            <img src="/images/logo_smarthr.svg" alt="SmartHR" width="84" height="15" />
            <small>© 2022, SmartHR, Inc.</small>
          </StyledCopyright>
        </CopyrightContainer>
      </LayoutContainer>
    </Wrapper>
  )
}

const Wrapper = styled.footer<{ isArticlePage: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding-inline: 120px;

  ${({ isArticlePage }) =>
    isArticlePage
      ? css`
          border-top: 1px solid ${CSS_COLOR.LIGHT_GREY_1};
        `
      : css`
          border: none;
        `}

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    padding-inline: 48px;
  }

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    padding-inline: 16px;
  }

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .loginButton {
    font-size: ${CSS_FONT_SIZE.PX_11};
  }
`

const LayoutContainer = styled.div<{ isArticlePage: boolean }>`
  display: grid;
  grid-template:
    'col1 . col2' auto
    'col1 . col2' auto
    'col1 . col2' auto
    'copy   copy copy' auto
    / auto minmax(80px, 1fr) auto;
  align-items: start;
  max-width: 1192px;
  ${({ isArticlePage }) =>
    isArticlePage
      ? css`
          padding-top: 81px;
          margin: 0 auto 54px;
        `
      : css`
          margin: 240px auto 54px;
          border-top: 1px solid ${CSS_COLOR.LIGHT_GREY_1};
          padding-top: 72px;
        `}

  @media (max-width: ${CSS_SIZE.BREAKPOINT_PC_1}) {
    grid-template:
      'col1 . col2' auto
      'col1 . col2' auto
      'col1 . col2' auto
      'copy   copy copy' auto
      / auto 80px 1fr;
    padding-top: 32px;
  }

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    grid-template:
      'col2' auto
      '.   ' 80px
      'col1' auto
      'copy' auto
      / 1fr;
    padding-top: 42px;
  }
`

const StyledLogo = styled.h2`
  margin-block: 9px 0;
  font-size: ${CSS_FONT_SIZE.PX_14};
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  line-height: 1.37;
  color: ${CSS_COLOR.BLACK};
`

const Col1Container = styled.div`
  grid-area: col1;
  display: grid;
  grid-template-columns: 100%;
  gap: 24px;
  justify-items: start;
`

const Col2Container = styled.div`
  grid-area: col2;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_PC_1}) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`

const CopyrightContainer = styled.div`
  grid-area: copy;
`

const StyledH3 = styled.h3`
  margin: 0;
  font-size: ${CSS_FONT_SIZE.PX_16};
  line-height: 2.26;
  color: ${CSS_COLOR.BLACK};
  margin-bottom: 16px;

  & + & {
    margin-top: -8px;
  }

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    margin-bottom: 0;

    & + & {
      margin-top: 8px;
    }
  }
`

const StyledUl = styled.ul`
  margin: 0 0 16px;
  padding: 0;
  list-style: none;
  color: ${CSS_COLOR.TEXT_BLACK};

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    display: none;
  }

  li {
    font-size: ${CSS_FONT_SIZE.PX_12};
    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }
`

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
`

const StyledCopyright = styled.p`
  margin-top: 64px;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    margin-top: 40px;
  }

  img {
    display: block;
    width: 84px;
    height: 15px;
  }

  small {
    font-size: ${CSS_FONT_SIZE.PX_10};
    line-height: 1;
    color: ${CSS_COLOR.BLACK};
  }
`
