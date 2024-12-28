import eslint from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["*.ts", "**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.es2025,
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      //
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      //
      "no-undef": "off",
      "no-unused-vars": "off",
      //
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
);
