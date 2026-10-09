export const filterByDateRange = <T extends { date: string }>(
  items: T[],
  startDate: string | null,
  endDate: string | null,
): T[] => {
  if (!startDate && !endDate) return items;

  return items.filter(
    (item) =>
      (!startDate || item.date >= startDate) &&
      (!endDate || item.date <= endDate),
  );
};
