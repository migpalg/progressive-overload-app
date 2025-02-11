import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

global.IS_REACT_ACT_ENVIRONMENT = true;

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
