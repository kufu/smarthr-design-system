module.exports = {
  extends: ['smarthr'],
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
