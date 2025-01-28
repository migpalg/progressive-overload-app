import type { Auth, User } from "firebase/auth";
import { createContext } from "react";

/**
 * State that contains the auth context.
 */
export type AuthContextState = {
  /**
   * Auth instance from firebase.
   */
  auth: Auth;

  /**
   * Current authenticated user.
   * 
   * TODO: Create an own type for this.
   */
  user: User | null;
};

/**
 * Context for the auth state.
 */
export const AuthContext = createContext<AuthContextState | null>(null);
