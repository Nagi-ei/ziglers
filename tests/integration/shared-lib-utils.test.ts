import { cn } from "@/shared/lib/utils";

describe("cn", () => {
  it("merges Tailwind utility conflicts while preserving other classes", () => {
    expect(cn("px-2 py-1", "px-4", "font-medium")).toBe("py-1 px-4 font-medium");
  });
});
