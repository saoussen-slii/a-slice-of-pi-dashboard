import { useMemo, useState } from "react";
import { ChartCard, ChartEmptyState } from "../../common";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS } from "../../constants";
import { getFrequencyCount } from "../../utils";
import type { Order, PizzaSize, PizzaType } from "../../types.ts";
import { PizzaFilters } from "../filters";
import { ChartTooltip } from "../../common";

interface StoreBarChartProps {
  orders: Order[];
}

const StoreBarChart = ({ orders }: StoreBarChartProps) => {
  const [pizzaType, setPizzaType] = useState<PizzaType | "">("");
  const [pizzaSize, setPizzaSize] = useState<PizzaSize | "">("");
  const filteredOrders = useMemo(
    () =>
      orders
        .map((order) => ({
          ...order,
          items: order.items.filter(
            (item) =>
              (!pizzaType || item.type === pizzaType) &&
              (!pizzaSize || item.size === pizzaSize),
          ),
        }))
        .filter((order) => order.items.length > 0),
    [orders, pizzaType, pizzaSize],
  );
  const storeCounts = getFrequencyCount(filteredOrders, "store");

  return (
    <ChartCard title="Store Performance">
      <div className="mb-1">
        <PizzaFilters
          pizzaType={pizzaType}
          pizzaSize={pizzaSize}
          onPizzaTypeChange={setPizzaType}
          onPizzaSizeChange={setPizzaSize}
        />
      </div>
      {storeCounts.length === 0 ? (
        <ChartEmptyState height={190} />
      ) : (
        <ResponsiveContainer width="100%" height={190}>
          <BarChart
            data={storeCounts}
            margin={{ top: 12, right: 12, left: 2, bottom: 4 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#E9EDF5"
              strokeDasharray="3 6"
            />
            <XAxis
              dataKey="name"
              interval={0}
              angle={-18}
              textAnchor="end"
              height={52}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 500 }}
              className="responsive-x-axis"
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={36}
              tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 500 }}
            />
            <Tooltip
              content={(props) => (
                <ChartTooltip
                  {...props}
                  valueFormatter={(value) => Number(value).toLocaleString()}
                />
              )}
              cursor={{ fill: "rgba(79, 70, 229, 0.05)" }}
            />
            <Bar
              dataKey="value"
              name="Orders"
              radius={[7, 7, 2, 2]}
              maxBarSize={36}
              animationDuration={800}
            >
              {storeCounts.map((__, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default StoreBarChart;
