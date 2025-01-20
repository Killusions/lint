/**
 * Copyright Siemens 2024.
 * SPDX-License-Identifier: MIT
 */
const typescriptEslint = require('typescript-eslint');
const { default: typescriptConfig } = require('@siemens/eslint-config-typescript');
const prettier = require('eslint-config-prettier');
const tsdocPlugin = require('eslint-plugin-tsdoc');
const eslintPluginHeaders = require('eslint-plugin-headers');

module.exports = typescriptEslint.config(
  { ignores: ['dist', '**/*.js', '**/*.cjs', '**/*.d.ts', '**/*.d.cts'] },
  {
    name: 'typescript-eslint',
    extends: [...typescriptConfig, prettier],
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: [
          './eslint-config-angular/tsconfig.json',
          './eslint-config-typescript/tsconfig.json',
          './eslint-plugin-defaultvalue/tsconfig.json',
          './eslint-plugin-defaultvalue/tsconfig.test.json'
        ],
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      'tsdoc': tsdocPlugin,
      'headers': eslintPluginHeaders
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['off'],
      'no-console': [
        'error',
        {
          allow: ['warn', 'error']
        }
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowDirectConstAssertionInArrowFunctions: true
        }
      ],
      'tsdoc/syntax': ['error'],
      'headers/header-format': [
        'error',
        {
          'source': 'string',
          'content': 'Copyright Siemens 2024.\nSPDX-License-Identifier: MIT'
        }
      ]
    }
  }
);
