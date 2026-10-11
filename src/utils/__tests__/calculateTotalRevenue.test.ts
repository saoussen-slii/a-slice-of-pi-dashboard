import { describe, expect, it } from "vitest";
import {
  calculateTotalRevenue,
  calculateTotalRevenueByMonth,
} from "../calculateTotalRevenue";
import type { Order, PriceGrid } from "../../types";

const prices: PriceGrid = {
  Cheese: { S: 10, M: 12, L: 14 },
  Deluxe: { S: 15, M: 18, L: 20 },
  Hawaiian: { S: 11, M: 13, L: 16 },
  Meatlovers: { S: 17, M: 19, L: 22 },
  Pepperoni: { S: 9, M: 12, L: 15 },
};

const orders: Order[] = [
  {
    order_id: 1,
    store: "Kanata",
    date: "2023-03-05",
    items: [
      { type: "Cheese", size: "S" },
      { type: "Deluxe", size: "M" },
    ],
  },
  {
    order_id: 2,
    store: "Orleans",
    date: "2023-01-01",
    items: [{ type: "Hawaiian", size: "L" }],
  },
  {
    order_id: 3,
    store: "Downtown",
    date: "2022-12-31",
    items: [{ type: "Pepperoni", size: "L" }],
  },
];

describe("calculateTotalRevenue", () => {
  it("defaults to 2023 and sums each item's configured price", () => {
    expect(calculateTotalRevenue(orders, prices)).toBe("$44");
  });

  it("uses the requested year and locale", () => {
    expect(calculateTotalRevenue(orders, prices, 2022, "fr-CA")).toBe("15 $");
  });

  it("returns a formatted zero when no orders match the year", () => {
    expect(calculateTotalRevenue(orders, prices, 2024)).toBe("$0");
  });
});

describe("calculateTotalRevenueByMonth", () => {
  it("aggregates items by zero-based month and returns months chronologically", () => {
    expect(calculateTotalRevenueByMonth(orders, prices)).toEqual([
      { month: 0, revenue: 16 },
      { month: 2, revenue: 28 },
    ]);
  });

  it("uses the requested year", () => {
    expect(calculateTotalRevenueByMonth(orders, prices, 2022)).toEqual([
      { month: 11, revenue: 15 },
    ]);
  });

  it("returns no months when there are no matching orders", () => {
    expect(calculateTotalRevenueByMonth([], prices)).toEqual([]);
  });
});
