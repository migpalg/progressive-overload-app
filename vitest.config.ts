import { coverageConfigDefaults, defineConfig } from "vitest/config";
import { mergeConfig } from "vite";
import config from "./vite.config";

export default mergeConfig(
  config,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        exclude: [
          ...coverageConfigDefaults.exclude,
          "**/firebase.ts",
          "**/main.tsx",
          "**/config.ts",
        ],
      },
    },
  })
);
