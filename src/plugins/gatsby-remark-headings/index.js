const toString = require('mdast-util-to-string')
const visit = require('unist-util-visit')

module.exports = () => (
  async function transformer(tree, file) {
    const headings = []

    visit(tree, 'heading', (heading) => {
      headings.push({
        value: toString(heading),
        depth: heading.depth,
      })
    })

    const mdxFile = file
    if (!mdxFile.data.meta) {
      mdxFile.data.meta = {}
    }

    mdxFile.data.meta.headings = headings
  }
)
