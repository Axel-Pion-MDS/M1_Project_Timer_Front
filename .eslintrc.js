module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
<<<<<<< HEAD
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/max-attributes-per-line': [
      'error',
=======
  extends: ["@nuxtjs", "plugin:nuxt/recommended"],
  plugins: [],
  // add your custom rules here
  rules: {
    "vue/max-attributes-per-line": [
      "error",
>>>>>>> 3d330c2 (fix: create volume for nodes modules and .nuxt / clean up packages)
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      },
    ],
<<<<<<< HEAD
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
        code: 120,
=======
    "vue/singleline-html-element-content-newline": [
      "error",
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ["pre", "textarea"],
      },
    ],
    "vue/max-len": [
      "error",
      {
        code: 80,
>>>>>>> 3d330c2 (fix: create volume for nodes modules and .nuxt / clean up packages)
        template: 120,
        tabWidth: 2,
        ignoreComments: false,
        ignoreUrls: false,
        ignoreStrings: false,
      },
    ],
<<<<<<< HEAD
    'comma-dangle': ['error', 'only-multiline'],
    'no-multiple-empty-lines': 'warn',
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'no-use-before-define': 'warn',
=======
    "comma-dangle": ["error", "only-multiline"],
    "no-multiple-empty-lines": "warn",
    "space-before-function-paren": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-v-text-v-html-on-component": "off",
    "no-use-before-define": "warn",
>>>>>>> 3d330c2 (fix: create volume for nodes modules and .nuxt / clean up packages)
  },
};
