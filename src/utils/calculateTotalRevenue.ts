import type { Order, PriceGrid } from "../types.ts";
export const calculateTotalRevenue = (
  orders: Order[],
  prices: PriceGrid,
  targetYear: number = 2023,
): number => {
  return orders
    .filter((order) => new Date(order.date).getFullYear() === targetYear)
    .flatMap((order) => order.items)
    .reduce((total, item) => total + (prices[item.type]?.[item.size] || 0), 0);
};
