import React, { FC } from 'react'
import { CodeBlock } from '@Components/article/CodeBlock'
import * as Components from './components'

type Props = {
  componentName: 'SelectCompanyAccount'
}

export const DesignPatternCodeBlock: FC<Props> = ({ componentName, ...componentProps }) => {
  return (
    <CodeBlock
      className="tsx"
      editable={true}
      withStyled={true}
      renderingComponent={componentName}
      layout="product"
      {...componentProps}
    >
      {Components[componentName]}
    </CodeBlock>
  )
}
