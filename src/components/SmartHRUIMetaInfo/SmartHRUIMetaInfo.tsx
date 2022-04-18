import React, { VFC } from 'react'
import packageInfo from 'smarthr-ui/package.json'
import styled from 'styled-components'

type Props = {
  name?: string
}

const STORYBOOK_PATH = 'https://smarthr-ui.netlify.app/?path=/story/'
const GITHUB_PATH = `https://github.com/kufu/smarthr-ui/tree/v${packageInfo.version}/src/components/`

export const SmartHRUIMetaInfo: VFC<Props> = ({ name }) => {
  return (
    <StyledUl>
      <li>SmartHR UI v{packageInfo.version}</li>
      <li>
        <a href={`${STORYBOOK_PATH}${name}`}>Storybook</a>
      </li>
      <li>
        <a href={`${GITHUB_PATH}${name}`}>ソースコード（GitHub）</a>
      </li>
    </StyledUl>
  )
}

const StyledUl = styled.ul`
  margin-block: 16px 0;
`
