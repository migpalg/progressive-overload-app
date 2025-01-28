import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./features/auth/contexts/auth-provider";
import { auth } from "./features/auth/firebase";
import { App } from "./features/core/app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider auth={auth}>
      <App />
    </AuthProvider>
  </StrictMode>
);
