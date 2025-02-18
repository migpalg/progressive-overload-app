import { describe, expect, it } from "vitest";
import { useAuth } from "../../hooks/use-auth";
import { renderHook } from "@testing-library/react";

describe("useAuth() hook unit testing", () => {
  it("should throw when AuthContext is not provided", async () => {
    const { result } = renderHook(() => useAuth());

    await expect(
      result.current.signInWithEmailAndPassword("test", "test")
    ).rejects.toThrow();
  });
});
