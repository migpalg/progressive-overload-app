import { describe, it, expect, vi } from "vitest";
import { useContext } from "react";
import { render, renderHook } from "@testing-library/react";
import { AuthProvider } from "../../contexts/auth-provider";
import { AuthContext } from "../../contexts/auth-context";

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
      onAuthStateChanged: vi.fn().mockImplementation((cb: CallableFunction) =>
        // Sets the user with a dummy uid
        cb({ uid: targetUserUid })
      ),
    };

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: ({ children }) => (
        <AuthProvider auth={authMock as never}>{children}</AuthProvider>
      ),
    });

    expect(authMock.onAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(result.current?.user?.uid).toBe(targetUserUid);
  });
});
