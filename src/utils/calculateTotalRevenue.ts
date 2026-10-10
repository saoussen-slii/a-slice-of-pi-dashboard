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
  targetYear: number = 2023,
  locale: string = "en-CA",
): string => {
  return getOrderItemsForYear(orders, targetYear)
    .reduce((total, item) => total + getItemRevenue(item, prices), 0)
    .toLocaleString(locale, {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    });
};

export const calculateTotalRevenueByMonth = (
  orders: Order[],
  prices: PriceGrid,
  targetYear: number = 2023,
): { month: number; revenue: number }[] => {
  const monthlyRevenue: Record<number, number> = {};
  getOrderItemsForYear(orders, targetYear).forEach((item) => {
    const month = new Date(item.date).getMonth();
    monthlyRevenue[month] =
      (monthlyRevenue[month] || 0) + getItemRevenue(item, prices);
  });
  return Object.entries(monthlyRevenue)
    .map(([month, revenue]) => ({ month: Number(month), revenue }))
    .sort((first, second) => first.month - second.month);
};
