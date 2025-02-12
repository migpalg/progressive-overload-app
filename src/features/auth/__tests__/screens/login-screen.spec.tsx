import { PropsWithChildren } from "react";
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
import { FirebaseError } from "firebase/app";

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

  it("should show firebase error code when the login fails", async () => {
    authMock.signInWithEmailAndPassword.mockRejectedValueOnce(
      new FirebaseError("auth/mocked-firebase-error", "Target error")
    );

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
        screen.getByText(/auth\.errors\.auth\/mocked-firebase-error/)
      ).not.toThrow();
    });
  });

  it("should show the default error message when the login fails", async () => {
    authMock.signInWithEmailAndPassword.mockRejectedValueOnce({
      code: "auth/should-not-be-shown",
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

  it("should show a loading state when the login is in progress", async () => {
    let resolvePromise: CallableFunction;

    authMock.signInWithEmailAndPassword.mockImplementationOnce(
      () =>
        new Promise<void>((resolve) => {
          // Make the promise never resolve
          resolvePromise = resolve;
        })
    );

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
        target: { value: "john.doe@example.com" },
      })
    );

    await act(() =>
      fireEvent.change(passwordInput, { target: { value: "password" } })
    );

    await act(() => fireEvent.click(submitButton));

    await waitFor(() =>
      expect(() => screen.getByTestId("authenticating-progress")).not.toThrow()
    );

    act(() => resolvePromise());

    await waitFor(() =>
      expect(() => screen.getByTestId("authenticating-progress")).toThrow()
    );
  });

  it("should show field errors when the form is submitted with invalid values", async () => {
    await act(async () => {
      render(<LoginScreen />, {
        wrapper: getWrapper(authMock),
      });
    });

    const emailInput = screen.getByTestId("login-email-input");
    const submitButton = screen.getByTestId("login-submit-button");

    await act(() => fireEvent.click(submitButton));

    await waitFor(() =>
      expect(() =>
        screen.getByText(/auth\.login\.email\.errors\.required/)
      ).not.toThrow()
    );

    await act(() =>
      fireEvent.change(emailInput, {
        target: { value: "invalid-email" },
      })
    );

    await act(() => fireEvent.click(submitButton));

    await waitFor(() =>
      expect(() =>
        screen.getByText(/auth\.login\.email\.errors\.invalid/)
      ).not.toThrow()
    );

    await waitFor(() =>
      expect(() =>
        screen.getByText(/auth\.login\.password\.errors\.required/)
      ).not.toThrow()
    );
  });
});
