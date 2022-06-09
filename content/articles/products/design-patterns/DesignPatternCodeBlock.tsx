import React, { VFC } from 'react'
import { CodeBlock } from '../../../../src/components/article/CodeBlock'
import * as Components from './components'

type Props = {
  componentName: 'SelectCompanyAccount'
}

export const DesignPatternCodeBlock: VFC<Props> = ({ componentName }) => {
  return (
    <CodeBlock className="tsx" editable={true} withStyled={true} renderingComponent={componentName} layout="product">
      {Components[componentName]}
    </CodeBlock>
  )
}
