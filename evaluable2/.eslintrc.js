module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    //AQUI no seria 2016?
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    "no-tabs": 0
  }
}
