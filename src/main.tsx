import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./features/auth/contexts/auth-provider";
import { Router } from "./features/core/router";
import { auth } from "./features/auth/firebase";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider auth={auth}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
