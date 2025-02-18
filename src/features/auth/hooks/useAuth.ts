import { useContext } from "react";
import { AuthContext, AuthContextState } from "../contexts/auth-context";

/**
 * 
 */
export const useAuth = (): AuthContextState => {
  return useContext(AuthContext);
};
