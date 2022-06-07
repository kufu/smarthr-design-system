module.exports = {
  extends: ['smarthr', 'plugin:storybook/recommended'],
  overrides: [{
    files: '*.mdx',
    extends: ['smarthr', 'plugin:mdx/recommended'],
    rules: {
      'react/jsx-filename-extension': [1, {
        extensions: ['.jsx', '.tsx', '.mdx']
      }]
    }
  }]
};