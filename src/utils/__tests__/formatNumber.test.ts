import { describe, expect, it } from "vitest";
import { formatNumber } from "../formatNumber";

describe("formatNumber", () => {
  it("formats numbers using the active English or French locale", () => {
    expect(formatNumber(12345.6, "en")).toBe(
      new Intl.NumberFormat("en-CA").format(12345.6),
    );
    expect(formatNumber(12345.6, "fr")).toBe(
      new Intl.NumberFormat("fr-CA").format(12345.6),
    );
  });
});
