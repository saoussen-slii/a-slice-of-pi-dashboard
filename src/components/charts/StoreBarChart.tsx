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
import { orders } from "../../data";
import { CHART_COLORS } from "../../constants";
import { getFrequencyCount } from "../../utils";
import type { Order } from "../../types.ts";

const storeCounts = getFrequencyCount(orders as Order[], "store");

const StoreBarChart = () => {
  return (
    <ChartCard title="Store Performance">
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
          <XAxis
            dataKey="name"
            interval={0}
            angle={-25}
            textAnchor="end"
            height={60}
            className="responsive-x-axis"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="Number of Orders">
            {storeCounts.map((__, index) => (
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
