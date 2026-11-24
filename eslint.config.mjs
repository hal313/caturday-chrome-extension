// ESLint flat config. Carries over the rules from the old .jshintrc.

import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/', 'package/', 'app/styles/']
  },

  js.configs.recommended,

  {
    plugins: { '@stylistic': stylistic },
    rules: {
      // Formerly jshint: camelcase, curly, eqeqeq, latedef, newcap, noarg, bitwise
      camelcase: ['error', { properties: 'never' }],
      curly: 'error',
      eqeqeq: 'error',
      'new-cap': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-use-before-define': ['error', { functions: false }],
      // Formerly jshint: indent, quotmark, trailing
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/semi': ['error', 'always']
    }
  },

  // Extension code: ES modules running in extension pages
  {
    files: ['app/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.webextensions }
    }
  },

  // Build scripts and config
  {
    files: ['scripts/**/*.mjs', '*.mjs'],
    languageOptions: {
      sourceType: 'module',
      globals: globals.node
    }
  }
];
