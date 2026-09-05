import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import importNewlines from "eslint-plugin-import-newlines";
import perfectionist from "eslint-plugin-perfectionist";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    extends: [
      js.configs.recommended, tseslint.configs.recommendedTypeChecked, tseslint.configs.stylisticTypeChecked,
    ],

    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.js", "extension/vite.config.ts"],
        },
      },
    },

    plugins: {
      "simple-import-sort": simpleImportSort,
      "@stylistic": stylistic,
      "import-newlines": importNewlines,
      "perfectionist": perfectionist,
    },
  },
  {
    files: [
      "**/*.ts", "**/*.d.ts", "**/*.js", "**/*.tsx",
    ],

    rules: {
      // Style rules
      "array-bracket-spacing": ["warn", "never"],

      "import-newlines/enforce": [
        "warn",
        {
          "items": 3,
          "semi": true,
        },
      ],

      "quotes": ["warn", "double"],
      "semi": ["warn", "always"],
      "simple-import-sort/imports": "warn",

      "@stylistic/array-bracket-newline": [
        "warn",
        {
          "minItems": 3,
          "multiline": true,
        },
      ],

      "@stylistic/array-element-newline": [
        "warn",
        {
          "consistent": true,
          "multiline": true,
        },
      ],

      "@stylistic/arrow-parens": ["warn", "as-needed"],
      "@stylistic/brace-style": ["warn", "1tbs"],
      "@stylistic/eol-last": ["warn", "always"],
      "@stylistic/comma-dangle": ["warn", "always-multiline"],
      "@stylistic/function-call-argument-newline": ["warn", "consistent"],
      "@stylistic/function-paren-newline": ["warn", "multiline-arguments"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/no-multi-spaces": ["warn"],
      "@stylistic/newline-per-chained-call": [
        "warn",
        {
          "ignoreChainWithDepth": 1,
        },
      ],

      // TypeScript rules
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unsafe-argument": "off",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "destructuredArrayIgnorePattern": "^_",
        },
      ],

      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          "checksVoidReturn": {
            "arguments": false,
          },
        },
      ],

      "@typescript-eslint/require-await": "off",
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx"],

    rules: {
      "@typescript-eslint/unbound-method": [0],
    },
  },
  globalIgnores([
    // Library files
    "**/node_modules",
    // Build artifacts
    "**/dist",
    // Lockfiles
    "**/*.lock",
    "**/*-lock.json",
  ]),
]);
