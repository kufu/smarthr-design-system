import { SHRUI_GITHUB_PATH, SHRUI_STORYBOOK_PATH } from '@Constants/application'
import React, { FC } from 'react'
import packageInfo from 'smarthr-ui/package.json'
import styled from 'styled-components'

type Props = {
  name?: string
  groupPath?: string
}

export const SmartHRUIMetaInfo: FC<Props> = ({ name, groupPath }) => {
  return (
    <StyledUl>
      <li>SmartHR UI v{packageInfo.version}</li>
      <li>
        <a href={`${SHRUI_STORYBOOK_PATH}${groupPath}${name}`}>Storybook</a>
      </li>
      <li>
        <a href={`${SHRUI_GITHUB_PATH}${name}`}>ソースコード（GitHub）</a>
      </li>
    </StyledUl>
  )
}

const StyledUl = styled.ul`
  > li {
    line-height: 1.75;
  }
`
