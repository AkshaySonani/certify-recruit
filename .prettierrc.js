// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
};

module.exports = config;
