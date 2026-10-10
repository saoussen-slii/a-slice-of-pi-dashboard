import { describe, expect, it } from "vitest";
import { filterByDateRange } from "./filterByDateRange";

const orders = [
  { id: 1, date: "2023-01-01" },
  { id: 2, date: "2023-02-15" },
  { id: 3, date: "2023-03-31" },
];

describe("filterByDateRange", () => {
  it("returns all items when no date bounds are provided", () => {
    expect(filterByDateRange(orders, "", "")).toBe(orders);
    expect(filterByDateRange(orders, null, null)).toBe(orders);
  });

  it("includes items on both boundaries", () => {
    expect(filterByDateRange(orders, "2023-02-15", "2023-03-31")).toEqual([
      orders[1],
      orders[2],
    ]);
  });

  it("supports filtering with only a start or end date", () => {
    expect(filterByDateRange(orders, "2023-02-15", null)).toEqual([
      orders[1],
      orders[2],
    ]);
    expect(filterByDateRange(orders, null, "2023-02-15")).toEqual([
      orders[0],
      orders[1],
    ]);
  });

  it("returns no items for a range with no matches", () => {
    expect(filterByDateRange(orders, "2024-01-01", "2024-12-31")).toEqual([]);
  });
});
