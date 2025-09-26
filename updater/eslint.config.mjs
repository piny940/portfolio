import eslint from '@eslint/js';
import { includeIgnoreFile } from "@eslint/compat";
import { defineConfig, globalIgnores } from "eslint/config";
import { fileURLToPath } from "node:url";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  stylistic.configs.recommended,

  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
  globalIgnores(["*.config.*", "src/server/_types.ts", "jest.setup.js"]),
]);
