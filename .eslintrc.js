module.exports = {
  parser: '@typescript-eslint/parser',

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'prettier'
  ],

  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier', 'import', 'unused-imports'],

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  rules: {
    'react/prop-types': 'off',

    'prettier/prettier': ['error', { endOfLine: 'auto' }],

    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'import/no-unresolved': 'error',

    'import/named': 'error',

    'unused-imports/no-unused-imports': 'error'
  },

  settings: {
    react: {
      version: 'detect'
    }
  },

  overrides: [
    {
      files: ['**/*.tsx', '**/*.ts'],
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
      }
    }
  ]
}
