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
    '^@/constants/(.*)$',
    '^@/layouts/(.*)$',
    '^@/component/(.*)$',
    '^@/lib/(.*)$',
    '^@/styles/(.*)$',
    'module.css$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
