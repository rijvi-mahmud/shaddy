/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@shaddy/eslint-config/next.js"],
  parserOptions: {
    project: true,
  },
};
