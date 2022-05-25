import React from 'react'
import { CodeBlock } from '../../../../../src/components/article/CodeBlock'
import ComponentCode from '!!raw-loader!./SelectCompanyAccount.tsx'

export const SelectCompanyAccountCodeBlock = () => {
  return (
    <CodeBlock className="tsx" editable={true} withStyled={true} layout="product">
      {ComponentCode}
    </CodeBlock>
  )
}
