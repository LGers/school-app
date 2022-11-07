module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': 0,
    'import/prefer-default-export': 'off',
    'spaced-comment': 'off',
    "@typescript-eslint/no-unused-vars": ["warn"],
    'react/jsx-props-no-spreading': 'off',
    "jsx-a11y/label-has-associated-control": [2, {
      "components": ["Input", "Input.Password", "Password"],
      "controlComponents": ["Input", "Input.Password", "Password"],
      "assert": "both",
      "depth": 3,
    }],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'axiosRequest'] }]
  },
};
