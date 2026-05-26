import js from "@eslint/js";
import globals from "globals";
import pluginImport from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      import: pluginImport,
    },
    rules: {
      "no-console": "off",
    },
  },
];
