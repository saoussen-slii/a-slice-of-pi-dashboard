import { calculateTotalRevenue } from "../../utils";
import orders from "../../data/order_data.json";
import prices from "../../data/pricing_data.json";
import type { Order } from "../../types.ts";

const TotalRevenueCard = () => {
  return (
    <div className="total-revenue-card">
      <h2>Total Revenue 2023</h2>
      <p>
        {calculateTotalRevenue(
          orders as Order[],
          prices,
          2023,
        ).toLocaleString()}
      </p>
    </div>
  );
};
export default TotalRevenueCard;
