const { defineConfig } = require('eslint/config');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = defineConfig([
  {
    ignores: ['**/dist/**', '**/node_modules/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      eqeqeq: ['error', 'always'],
      curly: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      'comma-dangle': ['error', 'only-multiline'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
    },
  },
]);
