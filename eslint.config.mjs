import { includeIgnoreFile } from "@eslint/compat";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import { fileURLToPath } from "node:url";
import path from "node:path";
import stylistic from "@stylistic/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
  ...nextVitals,
  stylistic.configs.recommended,
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },

  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
  globalIgnores(["*.config.*", "jest.setup.js"]),
]);
