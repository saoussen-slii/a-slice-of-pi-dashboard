import { describe, expect, it } from "vitest";
import { getOrderedStoreCounts } from "./getOrderedStoreCounts";

describe("getOrderedStoreCounts", () => {
  it("keeps the configured store order and omits stores without orders", () => {
    expect(
      getOrderedStoreCounts(["The Glebe", "Downtown", "The Glebe", "Kanata"]),
    ).toEqual([
      { name: "Kanata", value: 1 },
      { name: "Downtown", value: 1 },
      { name: "The Glebe", value: 2 },
    ]);
  });

  it("returns no stores when there are no orders", () => {
    expect(getOrderedStoreCounts([])).toEqual([]);
  });
});
