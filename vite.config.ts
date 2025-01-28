import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Optimize the build by splitting the vendor chunk
        manualChunks: {
          react: ["react"],
          "react-dom": ["react-dom"],
          "react-router": ["react-router"],
          i18next: ["i18next"],
          "react-i18next": ["react-i18next"],
          "@mui/material": ["@mui/material"],
          "@mui/icons-material": ["@mui/icons-material"],
        },
      },
    },
  },
});
