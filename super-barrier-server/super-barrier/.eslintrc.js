module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier", "plugin:storybook/recommended"],
  plugins: ["@typescript-eslint"],
  // ESLintでTypescriptを解析する
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    // TypeScriptのLint時に参照するconfigファイルを指定
    project: "./tsconfig.json"
  },
  // 上位ディレクトリにある親のeslintrcを参照しないようにする
  root: true,
  rules: {}
};