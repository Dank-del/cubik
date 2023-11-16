module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
  ],
  rules: {
    // The following rule is enabled only to supplement the inline suppression
    // examples, and because it is not a recommended rule, you should either
    // disable it, or understand what it enforces.
    // https://typescript-eslint.io/rules/explicit-function-return-type/
    '@typescript-eslint/explicit-function-return-type': 'warn',
  },

  ignorePatterns: ['**/*.js', 'node_modules', '.turbo', 'dist', 'coverage'],
};
