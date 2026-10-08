import {
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";

import { prices, orders } from "../../data";
import type { Order } from "../../types.ts";
import { CHART_COLORS } from "../../constants";
import { calculateTotalRevenueByMonth } from "../../utils";
import { ChartCard } from "../../common";

const MonthlyRevenueLineChart = () => {
  const monthlyRevenueData = calculateTotalRevenueByMonth(
    orders as Order[],
    prices,
  );
  return (
    <ChartCard title="Monthly Revenue">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={monthlyRevenueData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            className="responsive-x-axis"
            tickFormatter={(month: string) => month.slice(0, 3)}
          />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke={CHART_COLORS[0]}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default MonthlyRevenueLineChart;
