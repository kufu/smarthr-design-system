import { fixupConfigRules } from '@eslint/compat';
import smarthr from 'eslint-config-smarthr';
import eslintPluginAstro from 'eslint-plugin-astro';
import * as mdx from 'eslint-plugin-mdx';

// eslint-config-smarthr が内包するプラグイン（eslint-plugin-react / -smarthr / -mdx など）は
// ESLint 10 で削除された context.getFilename() / getScope() 等の非推奨 API をまだ利用しているため、
// @eslint/compat の fixupConfigRules でラップして互換シムを注入する。
export default [
  ...fixupConfigRules(smarthr),
  ...fixupConfigRules({
    ...mdx.flat,
    files: ['**/*.mdx'],
  }),
  ...fixupConfigRules(eslintPluginAstro.configs.recommended),
  ...fixupConfigRules(eslintPluginAstro.configs['jsx-a11y-recommended']),
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
      'smarthr/require-barrel-import': 'off',
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
  {
    files: ['**/*.astro'],
    rules: {
      'no-undef': 'off',
      'jsx-a11y/media-has-caption': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.astro'] }],
      'react/no-unknown-property': 'off',
      'react/jsx-key': 'off',
      'react/jsx-pascal-case': 'off',
      'react/jsx-no-undef': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'smarthr/a11y-image-has-alt-attribute': 'off',
      'smarthr/a11y-heading-in-sectioning-content': 'off',
      'smarthr/require-i18n-text': 'off',
      'smarthr/a11y-anchor-has-href-attribute': 'off',
      'smarthr/a11y-aria-labelledby': 'off',
      'smarthr/require-barrel-import': 'off',
    },
  },
];
