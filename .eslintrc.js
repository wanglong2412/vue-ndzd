module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'vue/script-indent': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'dot-notation': 'off',
    'prefer-const': 'off',
    'quotes': 'off',
    'quote-props': 'off',
    'space-before-function-paren': 'off'
  },
  overrides: [
    {
      files: [
        '*.vue',
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      rules: {
        indent: 'off'
      },
      env: {
        jest: true
      }
    }
  ]
}
