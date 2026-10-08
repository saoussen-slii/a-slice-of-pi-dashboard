import { ChartCard } from "../../common";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import orders from "../../data/order_data.json";
import { CHART_COLORS } from "../../constants";
import { getFrequencyCount } from "../../utils";
import type { Order } from "../../types.ts";

const storeCounts = getFrequencyCount(orders as Order[], "store");

const StoreBarChart = () => {
  return (
    <ChartCard
      title="Store Performance"
      subtitle="This chart shows the performance of each store."
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={storeCounts}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {storeCounts.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default StoreBarChart;
