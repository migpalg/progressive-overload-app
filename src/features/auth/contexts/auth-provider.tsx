import { useCallback, useEffect, useMemo, type ReactNode } from "react";
import type { Auth, User } from "firebase/auth";
import { AuthContext, AuthContextState } from "./auth-context";

/**
 * Props for the AuthProvider component.
 */
export type AuthProviderProps = {
  /**
   * Auth instance from firebase.
   */
  auth: Auth;

  /**
   * Children to render.
   */
  children: ReactNode;
};

/**
 * Contains all the logic for handling authentication state changes within
 * react.
 */
export const AuthProvider = ({ auth, children }: AuthProviderProps) => {
  // We use useMemo to memoize the value object, so that it doesn't change
  // on every render.
  const value = useMemo<AuthContextState>(() => ({ auth, user: null }), [auth]);

  /**
   * Handles auth state changes.
   */
  const handleAuthStateChanged = useCallback((user: User | null) => {
    console.log({ user });
  }, []);

  useEffect(
    // Subscribes to auth state changes on mount, and unsubscribes on unmount
    // of this component
    () => auth.onAuthStateChanged(handleAuthStateChanged),
    [auth, handleAuthStateChanged]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
