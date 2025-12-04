module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  rules: {
    // ZERO TOLERANCE POLICY - All rules enforce code quality
    'prettier/prettier': 'error',

    // TypeScript specific rules
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
    }],
    '@typescript-eslint/no-explicit-any': 'off', // Allow any for complex Azure SDK types
    '@typescript-eslint/no-unsafe-assignment': 'off', // Allow with any types
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    '@typescript-eslint/no-floating-promises': 'off', // Allow for top-level start
    '@typescript-eslint/no-misused-promises': ['error', {
      checksVoidReturn: false,
    }],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/require-await': 'off', // Allow async for consistency
    '@typescript-eslint/no-redundant-type-constituents': 'off', // Allow Error | unknown
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
    ],

    // Import rules
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/*.test.ts', '**/*.spec.ts', 'tests/**/*'],
    }],
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
      tsx: 'never',
      js: 'always',
      jsx: 'always',
    }],

    // Code quality rules
    'no-console': 'error', // Use logger instead
    'no-debugger': 'error',
    'max-len': ['error', {
      code: 120,
      ignoreComments: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'max-lines-per-function': ['error', {
      max: 50,
      skipBlankLines: true,
      skipComments: true,
    }],
    complexity: ['error', 10],
    'max-depth': ['error', 4],
    'max-nested-callbacks': ['error', 3],
    'no-magic-numbers': ['error', {
      ignore: [0, 1, -1, 2, 10, 15, 60, 1000, 4100, 10000, 65535, 200, 201, 400, 401, 403, 404, 500, 503],
      ignoreArrayIndexes: true,
      enforceConst: true,
    }],

    // Async/await rules
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'warn',
    'require-await': 'off', // Covered by @typescript-eslint/require-await

    // Error handling
    'no-throw-literal': 'error',
    '@typescript-eslint/no-throw-literal': 'error',

    // Best practices
    'func-names': 'off', // Allow unnamed functions in middleware
    eqeqeq: ['error', 'always'],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-param-reassign': ['error', { props: false }],
    'prefer-const': 'error',
    'prefer-template': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-body-style': ['error', 'as-needed'],

    // Node.js specific
    'no-process-exit': 'off', // Allow in graceful shutdown
    'no-sync': 'warn',

    // Security
    'no-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
