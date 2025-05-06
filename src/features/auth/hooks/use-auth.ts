import { useContext } from "react";
import { AuthContext, AuthContextState } from "../contexts/auth-context";

/**
 * Custom hook to access the AuthContext
 */
export const useAuth = (): AuthContextState => {
  return useContext(AuthContext);
};
