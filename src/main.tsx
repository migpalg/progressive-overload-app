import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./features/auth/contexts/auth-provider";
import { Router } from "./features/core/router";
import { auth } from "./features/core/firebase";
import { BrowserRouter } from "react-router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./features/core/theme";

// Configures internationalization
import "./features/core/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider auth={auth}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
