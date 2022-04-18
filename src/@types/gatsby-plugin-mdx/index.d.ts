declare module 'gatsby-plugin-mdx/mdx-renderer'

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}
