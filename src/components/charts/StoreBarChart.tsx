import { useMemo, useState } from "react";
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
import { CHART_COLORS } from "../../constants";
import { getFrequencyCount } from "../../utils";
import type {
  Order,
  PizzaSize,
  PizzaType,
} from "../../types.ts";
import { PizzaFilters } from "../filters";

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
      <PizzaFilters
        pizzaType={pizzaType}
        pizzaSize={pizzaSize}
        onPizzaTypeChange={setPizzaType}
        onPizzaSizeChange={setPizzaSize}
      />
      <ResponsiveContainer width="100%" height={260}>
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
