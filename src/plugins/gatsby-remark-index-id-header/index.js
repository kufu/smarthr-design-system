const visit = require('unist-util-visit')

function patch(context, key, value) {
  if (!context[key]) {
    context[key] = value
  }

  return context[key]
}
// マークダウンパース時にheading1 ~ 6にインデックス順のidを付与するプラグイン

// 参考
// - https://www.gatsbyjs.com/tutorial/remark-plugin-tutorial/
module.exports = ({ markdownAST }) => {
  const indexes = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  }

  visit(markdownAST, 'heading', (node) => {
    const { depth } = node
    if (depth > 6) return

    // ex) `h2-0`,`h2-1`...
    const id = `h${depth}-${indexes[depth]}`
    const data = patch(node, `data`, {})

    // 参考
    // - https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-autolink-headers/src/index.js
    patch(data, `id`, id)
    patch(data, `htmlAttributes`, {})
    patch(data, `hProperties`, {})
    patch(data.htmlAttributes, `id`, id)
    patch(data.hProperties, `id`, id)

    indexes[depth]++
  })

  return markdownAST
}
