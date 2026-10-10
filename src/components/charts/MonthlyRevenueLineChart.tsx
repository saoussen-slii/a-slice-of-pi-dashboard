import {
  Area,
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { prices } from "../../data";
import type { Order } from "../../types.ts";
import { CHART_COLORS } from "../../constants";
import { calculateTotalRevenueByMonth } from "../../utils";
import { ChartCard, ChartEmptyState } from "../../common";

interface MonthlyRevenueLineChartProps {
  orders: Order[];
}

const MonthlyRevenueLineChart = ({ orders }: MonthlyRevenueLineChartProps) => {
  const monthlyRevenueData = calculateTotalRevenueByMonth(orders, prices);
  return (
    <ChartCard title="Monthly Revenue">
      {monthlyRevenueData.length === 0 ? (
        <ChartEmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
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
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={CHART_COLORS[0]}
              fill="#eef2ff"
              fillOpacity={0.45}
              activeDot={{ r: 8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default MonthlyRevenueLineChart;
