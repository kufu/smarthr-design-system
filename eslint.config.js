import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import * as mdx from 'eslint-plugin-mdx';

const compat = new FlatCompat({
  // eslint-plugin-smarthr 内で eslint:recommended を extends しているため
  // https://github.com/eslint/eslintrc?tab=readme-ov-file#troubleshooting
  recommendedConfig: js.configs.recommended,
});

export default [
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  {
    files: ['**/*.mdx'],
    ...mdx.flat,
  },
  ...compat
    .config({
      extends: 'smarthr',
      overrides: [
        {
          files: ['**/*.ts', '**/*.tsx'],
          rules: {
            'react/react-in-jsx-scope': 'off',
          },
        },
        {
          files: ['**/_check/*.tsx'],
          rules: {
            'import/order': 'off',
            'arrow-body-style': 'off',
            'react/jsx-no-useless-fragments': 'off',

            // これらのルールはアクセシビリティの観点からは重要ですが、デザインシステムではサンプルを載せるために切り出しているため、これらのルールをオフにしています
            'smarthr/a11y-anchor-has-href-attribute': 'off',
            'smarthr/a11y-heading-in-sectioning-content': 'off',
            'smarthr/a11y-form-control-in-form': 'off',
            'smarthr/a11y-replace-unreadable-symbol': 'off',
          },
        },
      ],
    })
    .map((config) => ({
      ...config,
      ignores: ['**/*.astro'],
    })),
];
