import { calculateTotalRevenue } from "../../utils";
import { orders, prices } from "../../data";
import type { Order } from "../../types.ts";

const TotalRevenueCard = () => {
  return (
    <section className="h-auto w-full min-w-0 rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm">
      <h2 className="text-sm font-medium text-gray-500">Total Revenue 2023</h2>
      <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
        {calculateTotalRevenue(orders as Order[], prices, 2023)}
      </p>
    </section>
  );
};
export default TotalRevenueCard;
