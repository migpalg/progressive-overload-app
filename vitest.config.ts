import { coverageConfigDefaults, defineConfig } from "vitest/config";
import { mergeConfig } from "vite";
import config from "./vite.config";

export default mergeConfig(
  config,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./config/vitest-setup.ts"],
      coverage: {
        exclude: [
          ...coverageConfigDefaults.exclude,
          "**/firebase.ts",
          "**/main.tsx",
          "**/config.ts",
          "**/i18n.ts",
          "**/router.tsx",
          "**/theme.ts",
        ],
        reporter: ["text", "json-summary", "json"],
        thresholds: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
  }),
);
