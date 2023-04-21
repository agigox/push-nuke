const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

// http://eslint.org/docs/user-guide/configuring
// https://github.com/prettier/prettier#eslint
module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'no-debugger': 'off',
    'arrow-body-style': ['error', 'always'],
    'import/no-unresolved': 'off',
  },
  env: {
    jest: true,
    browser: true,
  },
};
