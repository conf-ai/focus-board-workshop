import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier/flat";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  prettierPlugin,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Additional ignores for consistent behavior:
    "node_modules/**",
    "dist/**",
    "coverage/**",
    "*.config.{js,ts,mjs}",
    "**/*.md",
    "docs/**",
    "backlog/**",
    ".eslintcache",
  ]),
]);

export default eslintConfig;
