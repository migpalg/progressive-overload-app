import { useContext } from "react";
import { AuthContext, AuthContextState } from "../contexts/auth-context";

export const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext);

  if (!context) {
    // TODO: Create custom errors for this project
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
