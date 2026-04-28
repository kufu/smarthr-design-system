import smarthr from 'eslint-config-smarthr';
import eslintPluginAstro from 'eslint-plugin-astro';
import * as mdx from 'eslint-plugin-mdx';

export default [
  ...smarthr,
  {
    ...mdx.flat,
    files: ['**/*.mdx']
  },
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'react/react-in-jsx-scope': 'off',

      // これらのルールはアクセシビリティの観点からは重要ですが、デザインシステムではサンプルを載せるために切り出しているため、これらのルールをオフにしています
      'smarthr/a11y-anchor-has-href-attribute': 'off',
      'smarthr/a11y-heading-in-sectioning-content': 'off',
      'smarthr/a11y-form-control-in-form': 'off',
      'smarthr/a11y-replace-unreadable-symbol': 'off',
      'smarthr/require-i18n-text': 'off',
    },
  },
  {
    files: ['**/_check/*.tsx'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-restricted-imports': 'off',
      'import/order': 'off',
      'arrow-body-style': 'off',
      'react/jsx-no-useless-fragments': 'off',
    },
  },
];
