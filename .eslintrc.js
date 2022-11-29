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
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier', 'plugin:vue/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    "vue/first-attribute-linebreak": ["error", {
      "singleline": "beside",
      "multiline": "beside"
    }],
    "vue/max-len": ["error", {
      "code": 120,
      "template": 120,
      "tabWidth": 2,
      "ignoreComments": false,
      "ignoreUrls": false,
      "ignoreStrings": false,
  }],
  'comma-dangle': ['error', 'only-multiline'],
  'no-multiple-empty-lines': 'warn',
  'space-before-function-paren': 'off',
  'vue/multi-word-component-names': 'off',
  'vue/no-v-text-v-html-on-component': 'off',
  'no-use-before-define': 'warn',
  },
}
