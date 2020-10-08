module.exports = {
  // Specifies the ESLint parser
  parser: '@typescript-eslint/parser',
  extends: [
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    // Uses eslint-config-prettier to disable ESLint rules from
    // @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    // Allows for the parsing of modern ECMAScript features
    ecmaVersion: 2019,
    // Allows for the use of imports
    sourceType: 'module',
  },
  // Place to specify ESLint rules. Can be used to overwrite rules specified
  // from the extended configs
  rules: {
    // *************************************************************************
    // Pure eslint
    // *************************************************************************
    'no-unused-vars': 'off',
    curly: 'error',
    'default-case': 'error',
    camelcase: 'off',
    'no-case-declarations': 'error',
    'no-invalid-this': 'error',
    'no-new-wrappers': 'error',
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-useless-call': 'error',
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    // *************************************************************************
    // @typescript-eslint
    // *************************************************************************
    '@typescript-eslint/naming-convention': [
      'error',
      // --------------
      // typeParameter
      // --------------
      { selector: 'typeParameter', format: ['PascalCase'] },

      // ---------
      // parameter
      // ---------
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },

      // ---------
      // interface
      // ---------
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },

      // ------------------
      // variable, function
      // ------------------
      {
        selector: ['variable', 'function'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },

      // --------------------
      // typeLike, enumMember
      // --------------------
      { selector: ['typeLike', 'enumMember'], format: ['StrictPascalCase'] },

      // ------------------
      // property (default)
      // ------------------
      {
        selector: 'property',
        format: ['camelCase'],
      },

      // ------------------------------------
      // property (quoted with space or dash)
      // ------------------------------------
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
        filter: {
          regex: '[- ]',
          match: true,
        },
      },

      // -------------------
      // property (public)
      // -------------------
      {
        selector: 'property',
        modifiers: ['public'],
        format: ['strictCamelCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },

      // -------------------------------
      // property (private)
      // -------------------------------
      {
        selector: 'property',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },

      // -------------------------------
      // property (protected)
      // -------------------------------
      {
        selector: 'property',
        modifiers: ['protected'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },

      // -------------------
      // property (static)
      // -------------------
      {
        selector: 'property',
        modifiers: ['public', 'static'],
        format: ['strictCamelCase', 'StrictPascalCase'],
      },

      {
        selector: ['method'],
        modifiers: ['public'],
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
    ],
    // ---------
    // no-shadow
    // ---------
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    // --------------------
    // no-use-before-define
    // --------------------
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],

    // -----------------------------
    // explicit-member-accessibility
    // -----------------------------
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { ignoredMethodNames: ['constructor'] },
    ],

    // --------------
    // no-unused-vars
    // --------------
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],

    // ----------
    // array-type
    // ----------
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

    // -----------------
    // no-empty-function
    // -----------------
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: [
          'private-constructors',
          'protected-constructors',
          'decoratedFunctions',
        ],
      },
    ],
  },
}
