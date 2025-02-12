import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  type Auth,
  type User,
} from "firebase/auth";
import { AuthContext, AuthContextState, AuthFetchStatus } from "./auth-context";

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
  children?: ReactNode;
};

/**
 * Contains all the logic for handling authentication state changes within
 * react.
 */
export const AuthProvider = ({ auth, children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [fetchStatus, setFetchStatus] = useState<AuthFetchStatus>("loading");

  /**
   * Handles auth state changes.
   */
  const handleAuthStateChanged = useCallback((user: User | null) => {
    setFetchStatus("success");
    setUser(user);
  }, []);

  const signInWithEmail = useCallback(
    (email: string, password: string) => {
      return signInWithEmailAndPassword(auth, email, password);
    },
    [auth]
  );

  const logOut = useCallback(() => signOut(auth), [auth]);

  // We use useMemo to memoize the value object, so that it doesn't change
  // on every render.
  const value = useMemo<AuthContextState>(
    () => ({
      auth,
      user,
      status: fetchStatus,
      signInWithEmailAndPassword: signInWithEmail,
      signOut: logOut,
    }),
    [auth, fetchStatus, logOut, signInWithEmail, user]
  );

  useEffect(() => {
    setFetchStatus("loading");

    // Subscribes to auth state changes on mount, and unsubscribes on unmount
    // of this component
    return auth.onAuthStateChanged(handleAuthStateChanged);
  }, [auth, handleAuthStateChanged]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
