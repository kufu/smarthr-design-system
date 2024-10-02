import { CodeBlock } from '@/components/CodeBlock';

type Props = {
  componentName: string;
  componentTitle: string;
};

// const query = graphql`
//   query PatternCode {
//     allMdx(filter: { frontmatter: { patternName: { ne: null } } }) {
//       nodes {
//         frontmatter {
//           patternName
//         }
//         fields {
//           patternCode
//         }
//       }
//     }
//   }
// `

export default function DesignPatternCodeBlock({ componentName, componentTitle, ...componentProps }: Props) {
  // const { allMdx } = useStaticQuery<Queries.PatternCodeQuery>(query)
  // const patternCode = allMdx.nodes.find((node) => node.frontmatter?.patternName === componentName)?.fields?.patternCode || ''
  const patternCode = 'WIP';

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
  );
}
