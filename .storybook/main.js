module.exports = {
  "stories": [
    "../**/*.stories.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /smarthr-patterns/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            allowTsInNodeModules: true
          },
        },
      ],
    })

    return config
  },
}
