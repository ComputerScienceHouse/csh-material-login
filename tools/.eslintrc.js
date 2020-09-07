module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'prettier'
  ],
  env: {
    node: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'import/no-extraneous-dependencies': ["error", {
      'devDependencies': true,
      'optionalDependencies': false,
      'peerDependencies': false
    }],
  }
};