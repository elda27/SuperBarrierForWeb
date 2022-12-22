module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  features: {
    emotionAlias: false,
    interactionsDebugger: true,
  },
  staticDirs: ["./test-assets"],
  framework: "@storybook/react",
  webpackFinal: async (config, { configType }) => {
    config.mode = "development";
    config.devtool = "inline-source-map";
    return config;
  },
};
