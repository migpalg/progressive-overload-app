import { render } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { AuthenticatedLayout } from "../../layouts/authenticated-layout";
import { createRoutesStub } from "react-router";
import { getWrapper } from "../__utils__/get-wrapper";

// TODO: Implement unit tests for <AuthenticatedLayout /> component
describe("<AuthenticatedLayout /> unit testing", () => {
  let authMock: {
    user: unknown;
    status: string;
  };

  beforeAll(() => {
    authMock = {
      user: null,
      status: "loading",
    };
  });

  it.todo("should render a skeleton loader when the status is loading");

  it("should show feedback when the application is loading", async () => {
    // Set state before rendering
    authMock.status = "loading";

    const { findByRole } = render(<AuthenticatedLayout />);

    const progressBar = await findByRole("progressbar");

    expect(progressBar).toBeInTheDocument();
  });

  it("should redirect to login when the user is not authenticated", async () => {
    // Set state before rendering
    authMock.user = null;
    authMock.status = "success";

    const Stub = createRoutesStub([
      {
        path: "/auth/login",
        Component: () => <div>auth/login</div>,
      },
      {
        path: "/",
        Component: AuthenticatedLayout,
      },
    ]);

    const { findByText } = render(<Stub initialEntries={["/"]} />, {
      wrapper: getWrapper(authMock),
    });

    const loginText = await findByText("auth/login");

    expect(loginText).toBeInTheDocument();
  });

  it("should render the application when the user is authenticated", async () => {
    // Set state before rendering
    authMock.user = { email: "dev@example.com" };
    authMock.status = "success";

    const Stub = createRoutesStub([
      {
        path: "/",
        Component: AuthenticatedLayout,
        children: [
          {
            path: "hello",
            Component: () => <div>hello</div>,
          },
        ],
      },
    ]);

    const { findByText } = render(<Stub initialEntries={["/hello"]} />, {
      wrapper: getWrapper(authMock),
    });

    const helloText = await findByText("hello");

    expect(helloText).toBeInTheDocument();
  });
});
