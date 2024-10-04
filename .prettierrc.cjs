/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  ...require('prettier-config-smarthr'),
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  plugins: ['prettier-plugin-astro', '@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react$',
    '^astro:$',
    '^node:(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@/constants/(.*)$',
    '^@/types/(.*)$',
    '^@/layouts/(.*)$',
    '^@/component/(.*)$',
    '^@/lib/(.*)$',
    '^@/styles/(.*)$',
    'module.scss$',
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};

module.exports = config;
