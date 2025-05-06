import { PropsWithChildren } from "react";
import { AuthContext } from "../../contexts/auth-context";

/**
 * Returns a wrapper component with the AuthContext provider.
 * @param authMock Auth context mock.
 */
export function getWrapper(authMock: unknown) {
  return ({ children }: PropsWithChildren) => (
    <AuthContext.Provider value={authMock as never}>
      {children}
    </AuthContext.Provider>
  );
}

