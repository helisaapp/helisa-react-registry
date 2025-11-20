import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier/flat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  prettier,
  allConfig: {
    plugins: [
      "prettier",
      "@typescript-eslint/eslint-plugin",
      "eslint-plugin-next",
    ],
    rules: {
      "no-unused-vars": "off", // Disable the base rule
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // Ignore unused arguments starting with _
          varsIgnorePattern: "^_", // Ignore unused variables starting with _
          ignoreRestSiblings: true,
        },
      ],
      // ... other Next.js specific rules
      "@next/next/no-assign-module-variable": "error",
    },
  },
});

const eslintConfig = defineConfig([
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
    "plugin:prettier/recommended",
  ),
]);

export default eslintConfig;
