import { calculateTotalRevenue } from "../../utils";
import { orders, prices } from "../../data";
import type { Order } from "../../types.ts";
import { ChartCard } from "../../common";

const TotalRevenueCard = () => {
  return (
    <ChartCard title="Total Revenue 2023">
      <p className="text-2xl font-bold tracking-tight text-gray-900">
        {calculateTotalRevenue(orders as Order[], prices, 2023)}
      </p>
    </ChartCard>
  );
};
export default TotalRevenueCard;
