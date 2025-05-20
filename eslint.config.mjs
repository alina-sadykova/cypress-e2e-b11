import { defineConfig } from "eslint/config";
// import globals from 'globals'
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    rules: {
      "prettier/prettier": ["error", { singleQuote: true }],
      indent: ["error", 2],
      "no-unused-vars": "error",
      "no-undef": "off",
      // semi: ['error', 'never'],
      quotes: ["error", "single"],
      "max-len": [
        "error",
        { code: 120, ignoreComments: true, ignoreStrings: true },
      ],
    },
  },
]);
