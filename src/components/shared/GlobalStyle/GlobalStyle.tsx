import { CSS_SIZE } from '@Constants/style'
import { defaultColor, defaultLeading } from 'smarthr-ui'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --header-height: 112px;

    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
      --header-height: 80px;
    }
  }

  @font-face {
    font-family: SDSYuGothic;
    font-weight: 400;
    src: local('Yu Gothic Medium');
  }

  @font-face {
    font-family: SDSYuGothic;
    font-weight: 700;
    src: local('Yu Gothic Bold');
  }

  body {
    margin: 0;
    font-family: SDSYuGothic, Yu Gothic, YuGothic, sans-serif;
    line-height: ${defaultLeading.RELAXED};
    color: ${defaultColor.TEXT_BLACK};
    overflow-wrap: break-word;
  }

  /* stylelint-disable */
  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }
  /* stylelint-enable */

  a {
    color: ${defaultColor.TEXT_LINK};
    text-decoration: underline;
  }

  table {
    border-collapse: collapse;
  }

  table tr {
    border-bottom: 1px solid ${defaultColor.BORDER};
  }

  table th,
  table td {
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    min-width: 7em; /* 5em+padding */
  }
`
