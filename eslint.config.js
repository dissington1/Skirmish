import globals from "globals";
import p5js from "eslint-plugin-p5js";

export default [
  {
    ignores: ["node_modules/"]
  },
  {
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        p5: "readonly"
      }
    },
    extends: [
      "eslint:recommended",
      "plugin:p5js/recommended"
    ]
  },
  p5js.configs.p5
];
