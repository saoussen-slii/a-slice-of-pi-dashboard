export const getFrequencyCount = <T, K extends keyof T>(
  items: T[],
  key: K,
): { name: string; value: number }[] => {
  return Object.entries(
    items.reduce(
      (acc, item) => {
        const keyValue = String(item[key]);
        acc[keyValue] = (acc[keyValue] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  ).map(([name, value]) => ({ name, value }));
};
