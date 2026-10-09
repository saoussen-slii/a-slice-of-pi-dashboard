import type { Order, OrderItem, PriceGrid } from "../types.ts";

const getOrderItemsForYear = (orders: Order[], targetYear: number) =>
  orders
    .filter((order) => new Date(order.date).getFullYear() === targetYear)
    .flatMap((order) =>
      order.items.map((item) => ({ ...item, date: order.date })),
    );

const getItemRevenue = (item: OrderItem, prices: PriceGrid) =>
  prices[item.type]?.[item.size] || 0;

export const calculateTotalRevenue = (
  orders: Order[],
  prices: PriceGrid,
  targetYear: number = 2026,
): string => {
  return getOrderItemsForYear(orders, targetYear)
    .reduce((total, item) => total + getItemRevenue(item, prices), 0)
    .toLocaleString("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    });
};

export const calculateTotalRevenueByMonth = (
  orders: Order[],
  prices: PriceGrid,
  targetYear: number = 2026,
): { month: string; revenue: number }[] => {
  const monthlyRevenue: Record<string, number> = {};
  getOrderItemsForYear(orders, targetYear).forEach((item) => {
    const month = new Date(item.date).toLocaleString("default", {
      month: "long",
    });
    monthlyRevenue[month] =
      (monthlyRevenue[month] || 0) + getItemRevenue(item, prices);
  });
  return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
    month,
    revenue,
  }));
};
