npm install --save-dev @types/p5 eslint-plugin-p5js globals

cat > jsconfig.json << EOL
{
  "compilerOptions": {
    "allowJs": true,
    "target": "ES2022",
    "types": ["p5/global"],
    "noEmit": true
  },
  "include": ["./**/*.js"]
}
EOL

cat > eslint.config.js << EOL
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
EOL
