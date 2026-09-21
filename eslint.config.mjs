import { includeIgnoreFile } from "@eslint/compat";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import { fileURLToPath } from "node:url";
import stylistic from "@stylistic/eslint-plugin";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
  ...nextVitals,
  stylistic.configs.recommended,

  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
  globalIgnores(["*.config.*", "jest.setup.js"]),
]);
