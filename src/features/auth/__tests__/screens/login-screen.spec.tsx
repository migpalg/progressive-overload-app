import { PropsWithChildren } from "react";
import { beforeAll, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthContext } from "../../contexts/auth-context";
import { LoginScreen } from "../../screens/login-screen";
import { FirebaseError } from "firebase/app";

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
  useSearchParams: () => [new URLSearchParams()],
}));

function getWrapper(authMock: unknown) {
  return ({ children }: PropsWithChildren) => (
    <AuthContext.Provider value={authMock as never}>
      {children}
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
    authMock.signInWithEmailAndPassword.mockClear();
  });

  it("should login with auth provider", async () => {
    authMock.signInWithEmailAndPassword.mockResolvedValueOnce({});

    render(<LoginScreen />, {
      wrapper: getWrapper(authMock),
    });

    const emailInput = await screen.findByTestId("login-email-input");
    const passwordInput = await screen.findByTestId("login-password-input");
    const submitButton = await screen.findByTestId("login-submit-button");

    await userEvent.type(emailInput, "jhon.doe@example.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.click(submitButton);

    expect(authMock.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  it("should show firebase error code when the login fails", async () => {
    authMock.signInWithEmailAndPassword.mockRejectedValueOnce(
      new FirebaseError("auth/mocked-firebase-error", "Target error")
    );

    render(<LoginScreen />, {
      wrapper: getWrapper(authMock),
    });

    const emailInput = await screen.findByTestId("login-email-input");
    const passwordInput = await screen.findByTestId("login-password-input");
    const submitButton = await screen.findByTestId("login-submit-button");

    await userEvent.type(emailInput, "jhon.doe@example.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.click(submitButton);

    const firebaseError = await screen.findByText(
      /auth\.errors\.auth\/mocked-firebase-error/
    );

    expect(authMock.signInWithEmailAndPassword).toHaveBeenCalled();
    expect(firebaseError).toBeInTheDocument();
  });

  it("should show the default error message when the login fails", async () => {
    authMock.signInWithEmailAndPassword.mockRejectedValueOnce({
      code: "auth/should-not-be-shown",
    });

    render(<LoginScreen />, {
      wrapper: getWrapper(authMock),
    });

    const emailInput = await screen.findByTestId("login-email-input");
    const passwordInput = await screen.findByTestId("login-password-input");
    const submitButton = await screen.findByTestId("login-submit-button");

    await userEvent.type(emailInput, "jhon.doe@example.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.click(submitButton);
    const defaultError = await screen.findByText(/auth\.errors\.auth\/default/);

    expect(authMock.signInWithEmailAndPassword).toHaveBeenCalled();
    expect(defaultError).toBeInTheDocument();
  });

  it("should show a loading state when the login is in progress", async () => {
    authMock.signInWithEmailAndPassword.mockImplementationOnce(
      () =>
        new Promise<void>(() => {
          // Make the promise never resolve
        })
    );

    render(<LoginScreen />, {
      wrapper: getWrapper(authMock),
    });

    const emailInput = await screen.findByTestId("login-email-input");
    const passwordInput = await screen.findByTestId("login-password-input");
    const submitButton = await screen.findByTestId("login-submit-button");

    await userEvent.type(emailInput, "john.doe@example.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.click(submitButton);

    const authenticatingProgress = await screen.findByTestId(
      "authenticating-progress"
    );

    expect(authenticatingProgress).toBeInTheDocument();
  });

  it("should show field errors when the form is submitted with invalid values", async () => {
    render(<LoginScreen />, {
      wrapper: getWrapper(authMock),
    });

    const emailInput = await screen.findByTestId("login-email-input");
    const submitButton = await screen.findByTestId("login-submit-button");

    await userEvent.click(submitButton);

    const requiredEmailError = await screen.findByText(
      /auth\.login\.email\.errors\.required/
    );

    expect(requiredEmailError).toBeInTheDocument();

    await userEvent.type(emailInput, "invalid-email");
    await userEvent.click(submitButton);

    const invalidEmailError = await screen.findByText(
      /auth\.login\.email\.errors\.invalid/
    );

    const invalidPasswordError = await screen.findByText(
      /auth\.login\.password\.errors\.required/
    );

    expect(invalidEmailError).toBeInTheDocument();
    expect(invalidPasswordError).toBeInTheDocument();
    expect(authMock.signInWithEmailAndPassword).not.toHaveBeenCalled();
  });
});
