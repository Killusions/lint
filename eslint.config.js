/**
 * Copyright Siemens 2024.
 * SPDX-License-Identifier: MIT
 */
import path from 'path';
import { fileURLToPath } from 'url';
import typescriptEslint from 'typescript-eslint';
import typescriptConfig from '@siemens/eslint-config-typescript';
import prettier from 'eslint-config-prettier';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import eslintPluginHeaders from 'eslint-plugin-headers';

// mimic CommonJS variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  ...typescriptEslint.config(
    { ignores: ['dist', '**/*.js', '**/*.d.ts'] },
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
  )
];
