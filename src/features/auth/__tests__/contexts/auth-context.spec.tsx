import { describe, it, expect, vi } from "vitest";
import { useContext } from "react";
import { render, renderHook } from "@testing-library/react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthProvider } from "../../contexts/auth-provider";
import { AuthContext } from "../../contexts/auth-context";

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));

describe("AuthContext unit tests", () => {
  it("should register to auth state changes", () => {
    const authMock = {
      onAuthStateChanged: vi.fn(),
    };

    render(<AuthProvider auth={authMock as never} />);

    expect(authMock.onAuthStateChanged).toHaveBeenCalledTimes(1);
  });

  it("should set user when auth state changes", () => {
    const targetUserUid = "123";

    const authMock = {
      onAuthStateChanged: vi.fn().mockImplementation((cb: CallableFunction) => {
        cb({ uid: targetUserUid });

        return () => { };
      }),
    };

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: ({ children }) => (
        <AuthProvider auth={authMock as never}>{children}</AuthProvider>
      ),
    });

    expect(authMock.onAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(result.current?.user?.uid).toBe(targetUserUid);
  });

  it("should sign in with email and password", async () => {
    const email = "john.doe@example.com";
    const password = "password";

    const authMock = {
      onAuthStateChanged: vi.fn(),
    };

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: ({ children }) => (
        <AuthProvider auth={authMock as never}>{children}</AuthProvider>
      ),
    });

    result.current.signInWithEmailAndPassword(email, password);

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  it("should sign out", async () => {
    const authMock = {
      onAuthStateChanged: vi.fn(),
    };

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: ({ children }) => (
        <AuthProvider auth={authMock as never}>{children}</AuthProvider>
      ),
    });

    result.current.signOut();

    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
