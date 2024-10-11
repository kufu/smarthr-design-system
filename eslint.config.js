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
    ...mdx.flat,
  },
  ...compat.config({
    extends: 'smarthr',
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
          'react/react-in-jsx-scope': 'off',
        },
      },
    ],
  }),
];
