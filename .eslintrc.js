module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    indent: ["error", 2],
    "react/display-name": 0,
    "no-unused-vars": 1,
    "react/prop-types": 1,
    "require-atomic-updates": 0,
    "no-async-promise-executor": 0,
    "no-misleading-character-class": 0,
    "no-useless-catch": 0,
    "no-empty": 1
  }
};
