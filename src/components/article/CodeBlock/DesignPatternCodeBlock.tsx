import { CodeBlock } from '@Components/article/CodeBlock'
import { graphql, useStaticQuery } from 'gatsby'
import React, { FC } from 'react'

type Props = {
  componentName: string
  componentTitle: string
}

const query = graphql`
  query PatternCode {
    allMdx(filter: { frontmatter: { patternName: { ne: null } } }) {
      nodes {
        frontmatter {
          patternName
        }
        fields {
          patternCode
        }
      }
    }
  }
`

export const DesignPatternCodeBlock: FC<Props> = ({ componentName, componentTitle, ...componentProps }) => {
  const { allMdx } = useStaticQuery<Queries.PatternCodeQuery>(query)
  const patternCode =
    allMdx.nodes.find((node) => {
      return node.frontmatter?.patternName === componentName
    })?.fields?.patternCode || ''

  return (
    <CodeBlock
      {...componentProps}
      className="tsx"
      editable={true}
      withStyled={true}
      renderingComponent={componentName}
      componentTitle={componentTitle}
      layout="product"
    >
      {patternCode}
    </CodeBlock>
  )
}
