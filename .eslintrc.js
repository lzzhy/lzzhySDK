module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ]
  },
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.js", "jest.config.js", "scripts/*"],
      rules: {
        "@typescript-eslint/no-var-requires": 0
      }
    }
  ],
  ignorePatterns: ["packages/*/dist"]
}
