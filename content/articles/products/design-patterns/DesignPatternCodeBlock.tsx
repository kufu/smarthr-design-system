import React, { FC } from 'react'
import { CodeBlock } from '@Components/article/CodeBlock'
import * as Components from './components'

type Props = {
  componentName: 'SelectCompanyAccount'
  componentTitle: string
}

export const DesignPatternCodeBlock: FC<Props> = ({ componentName, componentTitle, ...componentProps }) => {
  return (
    <CodeBlock
      className="tsx"
      editable={true}
      withStyled={true}
      renderingComponent={componentName}
      componentTitle={componentTitle}
      layout="product"
      {...componentProps}
    >
      {Components[componentName]}
    </CodeBlock>
  )
}
