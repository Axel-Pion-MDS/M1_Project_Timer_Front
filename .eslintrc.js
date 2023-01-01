module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea'],
      },
    ],
    'vue/max-len': [
      'error',
      {
        // code: 120,
        // template: 120,
        tabWidth: 2,
        ignoreComments: false,
        ignoreUrls: false,
        ignoreStrings: false,
      },
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'no-multiple-empty-lines': 'warn',
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'no-use-before-define': 'warn',
  },
}
