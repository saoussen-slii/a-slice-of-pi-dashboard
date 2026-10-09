import { calculateTotalRevenue } from "../../utils";
import { orders, prices } from "../../data";
import type { Order } from "../../types.ts";

const TotalRevenueCard = () => {
  return (
    <section className="min-w-0 rounded-lg border border-gray-200 bg-white p-2.5 text-center shadow-sm">
      <h2>Total Revenue 2023</h2>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
        {calculateTotalRevenue(orders as Order[], prices, 2023)}
      </p>
    </section>
  );
};
export default TotalRevenueCard;
