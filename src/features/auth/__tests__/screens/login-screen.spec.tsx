import { beforeAll, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { MemoryRouter } from "react-router";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { AuthContext } from "../../contexts/auth-context";
import { LoginScreen } from "../../screens/login-screen";
import { PropsWithChildren } from "react";

function getWrapper(authMock: unknown) {
  return ({ children }: PropsWithChildren) => (
    <AuthContext.Provider value={authMock as never}>
      <MemoryRouter>{children}</MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("<LoginScreen /> unit testing", async () => {
  let authMock: {
    signInWithEmailAndPassword: Mock;
  };

  beforeAll(() => {
    authMock = {
      signInWithEmailAndPassword: vi.fn(),
    };
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should login with auth provider", async () => {
    authMock.signInWithEmailAndPassword.mockResolvedValueOnce({});

    await act(async () => {
      render(<LoginScreen />, {
        wrapper: getWrapper(authMock),
      });
    });

    const emailInput = screen.getByTestId("login-email-input");
    const passwordInput = screen.getByTestId("login-password-input");
    const submitButton = screen.getByTestId("login-submit-button");

    await act(() =>
      fireEvent.change(emailInput, {
        target: { value: "jhon.doe@example.com" },
      })
    );

    await act(() =>
      fireEvent.change(passwordInput, { target: { value: "password" } })
    );

    await act(() => fireEvent.click(submitButton));

    await waitFor(() =>
      expect(authMock.signInWithEmailAndPassword).toHaveBeenCalledTimes(1)
    );
  });

  it("should show an error message when the login fails", async () => {
    authMock.signInWithEmailAndPassword.mockRejectedValueOnce({
      code: "auth/target-key",
    });

    await act(async () => {
      render(<LoginScreen />, {
        wrapper: getWrapper(authMock),
      });
    });

    const emailInput = screen.getByTestId("login-email-input");
    const passwordInput = screen.getByTestId("login-password-input");
    const submitButton = screen.getByTestId("login-submit-button");

    await act(() =>
      fireEvent.change(emailInput, {
        target: { value: "jhon.doe@example.com" },
      })
    );

    await act(() =>
      fireEvent.change(passwordInput, { target: { value: "password" } })
    );

    await act(() => fireEvent.click(submitButton));

    await waitFor(() =>
      expect(authMock.signInWithEmailAndPassword).toHaveBeenCalled()
    );

    await waitFor(() => {
      expect(() =>
        screen.getByText(/auth\.errors\.auth\/default/)
      ).not.toThrow();
    });
  });
});
