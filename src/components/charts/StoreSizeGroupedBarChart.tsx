import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "../../common";
import { CHART_COLORS } from "../../constants";
import type { Order, PizzaSize, StoreLocation } from "../../types.ts";

interface StoreSizeGroupedBarChartProps {
  orders: Order[];
}

const pizzaSizes: PizzaSize[] = ["S", "M", "L"];

const StoreSizeGroupedBarChart = ({
  orders,
}: StoreSizeGroupedBarChartProps) => {
  const salesByStore = useMemo(() => {
    const counts = new Map<StoreLocation, Record<PizzaSize, number>>();

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const sizeCounts = counts.get(order.store) ?? { S: 0, M: 0, L: 0 };
        sizeCounts[item.size] += 1;
        counts.set(order.store, sizeCounts);
      });
    });

    return Array.from(counts, ([store, sizes]) => ({ store, ...sizes }));
  }, [orders]);

  return (
    <ChartCard title="Pizza Sales by Store and Size">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={salesByStore}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="store"
            interval={0}
            angle={-25}
            textAnchor="end"
            height={60}
            className="responsive-x-axis"
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          {pizzaSizes.map((size, index) => (
            <Bar
              key={size}
              dataKey={size}
              name={`Size ${size}`}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default StoreSizeGroupedBarChart;
