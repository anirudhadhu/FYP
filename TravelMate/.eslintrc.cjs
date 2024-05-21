module.exports = {
  root: true, // Indicates that ESLint should stop looking for configuration files in parent directories
  env: { browser: true, es2020: true }, // Specifies the environment for the code (browser and ECMAScript 2020)
  extends: [ // Extends the configurations provided by eslint-plugin-react and eslint-plugin-react-hooks
    'eslint:recommended', // Recommended ESLint rules
    'plugin:react/recommended', // Recommended rules for React
    'plugin:react/jsx-runtime', // Recommended rules for React JSX runtime
    'plugin:react-hooks/recommended', // Recommended rules for React hooks
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'], // Specifies patterns for files/directories to ignore during linting
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }, // Configures parser options (ECMAScript version and source type)
  settings: { react: { version: '18.2' } }, // Specifies settings for eslint-plugin-react (React version)
  plugins: ['react-refresh'], // Specifies ESLint plugins to use (here, it includes 'react-refresh')
  rules: {
    'react/jsx-no-target-blank': 'off', // Disables the rule that warns against using target="_blank" in JSX
    'react-refresh/only-export-components': [ // Specifies the rule for react-refresh plugin
      'warn',
      { allowConstantExport: true }, // Allows constant exports along with components
    ],
  },
};


// root: true indicates that this configuration file is the root of the ESLint configuration tree.
// env specifies the environments where the code will run (browser environment and ECMAScript 2020 features).
// extends extends the recommended configurations provided by ESLint and additional plugins for React and React Hooks.
// ignorePatterns specifies patterns for files or directories to be ignored during linting.
// parserOptions configures options for the JavaScript parser (latest ECMAScript version and module source type).
// settings provides settings specific to eslint-plugin-react, such as the React version.
// plugins specifies ESLint plugins to use, here including react-refresh.
// rules defines specific linting rules and their configurations. For example, 'react/jsx-no-target-blank': 'off' disables the rule that warns against using target="_blank" in JSX, and 'react-refresh/only-export-components' allows constant exports along with components, with a warning level.