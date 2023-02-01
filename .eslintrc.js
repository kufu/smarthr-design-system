module.exports = {
  extends: ['smarthr'],
  overrides: [
    {
      files: '*.mdx',
      extends: ['smarthr', 'plugin:mdx/recommended'],
      rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx', '.mdx'] }],
      },
    },
  ],
  rules: {
    // GatsbyのLinkコンポーネントで警告が出てしまうためoffにする
    'smarthr/a11y-anchor-has-href-attribute': 0,
  },
}
