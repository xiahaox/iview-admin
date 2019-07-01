module.exports = {
  root: true,
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false
      }
    ],
    'no-undef': 'off',
    camelcase: 'off',
    'no-tab': 'off',
    semi: 'off',
    'space-before-function-paren': 'off',
    eqeqeq: 'off',
    'spacce-comment': 'off',
    'no-unused-vars': 'off',
    'no-trailing-spaces': 'off',
    curly: 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
