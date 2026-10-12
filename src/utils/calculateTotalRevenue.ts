import type { Order, OrderItem, PriceGrid, StoreLocation } from "../types.ts";
import { DASHBOARD_YEAR } from "../constants";
import { STORE_LOCATIONS } from "../types.ts";

const getOrderItemsForYear = (orders: Order[], targetYear: number) =>
  orders
    .filter((order) => new Date(order.date).getUTCFullYear() === targetYear)
    .flatMap((order) =>
      order.items.map((item) => ({ ...item, date: order.date })),
    );

const getItemRevenue = (item: OrderItem, prices: PriceGrid) =>
  prices[item.type]?.[item.size] || 0;

export const calculateTotalRevenue = (
  orders: Order[],
  prices: PriceGrid,
  targetYear: number = DASHBOARD_YEAR,
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
  targetYear: number = DASHBOARD_YEAR,
): { month: number; revenue: number }[] => {
  const monthlyRevenue: Record<number, number> = {};
  getOrderItemsForYear(orders, targetYear).forEach((item) => {
    const month = new Date(item.date).getUTCMonth();
    monthlyRevenue[month] =
      (monthlyRevenue[month] || 0) + getItemRevenue(item, prices);
  });
  return Object.entries(monthlyRevenue)
    .map(([month, revenue]) => ({ month: Number(month), revenue }))
    .sort((first, second) => first.month - second.month);
};

export const calculateRevenueByStore = (
  orders: Order[],
  prices: PriceGrid,
): { store: StoreLocation; revenue: number }[] => {
  const revenueByStore = new Map<StoreLocation, number>();

  orders.forEach((order) => {
    const orderRevenue = order.items.reduce(
      (total, item) => total + getItemRevenue(item, prices),
      0,
    );
    revenueByStore.set(
      order.store,
      (revenueByStore.get(order.store) ?? 0) + orderRevenue,
    );
  });

  return STORE_LOCATIONS.flatMap((store) => {
    const revenue = revenueByStore.get(store);
    return revenue ? [{ store, revenue }] : [];
  });
};
