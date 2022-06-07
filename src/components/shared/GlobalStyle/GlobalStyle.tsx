import { defaultColor, defaultLeading } from 'smarthr-ui'
import { createGlobalStyle } from 'styled-components'
import { CSS_SIZE } from '@Constants/style'

export const GlobalStyle = createGlobalStyle`
  :root {
    --header-height: 112px;
    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
      --header-height: 80px;
    }
  }

  body {
    margin: 0;
    font-family: Yu Gothic Medium, 游ゴシック Medium, YuGothic, 游ゴシック体, sans-serif;
    line-height: ${defaultLeading.RELAXED};
    color: ${defaultColor.TEXT_BLACK};
    word-break: break-all;
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
  }
`
