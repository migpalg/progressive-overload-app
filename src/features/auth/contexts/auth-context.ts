import type { Auth, User, UserCredential } from "firebase/auth";
import { createContext } from "react";

export type AuthFetchStatus = "loading" | "error" | "success";

/**
 * State that contains the auth context.
 */
export type AuthContextState = {
  /**
   * Auth instance from firebase.
   */
  auth: Auth | null;

  /**
   * Current authenticated user.
   *
   * TODO: Create an own type for this.
   */
  user: User | null;

  /**
   * Fetch status of the auth context.
   */
  status: AuthFetchStatus;

  /**
   * Sign in with email and password.
   * @param email target email
   * @param password target password
   */
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;

  signOut: () => Promise<void>;
};

const defaultAuthContext: AuthContextState = {
  auth: null,
  user: null,
  status: "loading",
  signInWithEmailAndPassword: () => Promise.reject("Not implemented"),
  signOut: () => Promise.reject("Not implemented"),
};

/**
 * Context for the auth state.
 */
export const AuthContext = createContext<AuthContextState>(defaultAuthContext);
