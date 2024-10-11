/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ...require('prettier-config-smarthr'),
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  plugins: ['prettier-plugin-astro'],
};

module.exports = config;
