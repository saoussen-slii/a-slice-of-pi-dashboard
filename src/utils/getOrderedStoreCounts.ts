import { STORE_LOCATIONS, type StoreLocation } from "../types.ts";

export const getOrderedStoreCounts = (
  stores: StoreLocation[],
): { name: StoreLocation; value: number }[] => {
  const counts = new Map<StoreLocation, number>();
  stores.forEach((store) => counts.set(store, (counts.get(store) ?? 0) + 1));

  return STORE_LOCATIONS.flatMap((name) => {
    const value = counts.get(name);
    return value ? [{ name, value }] : [];
  });
};
