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
import { useTranslation } from "react-i18next";
import { ChartCard, ChartEmptyState, ChartTooltip } from "../../common";
import { CHART_COLORS } from "../../constants";
import {
  STORE_LOCATIONS,
  type Order,
  type PizzaSize,
  type StoreLocation,
} from "../../types.ts";
import { localeFor } from "../../i18n";

interface StoreSizeGroupedBarChartProps {
  orders: Order[];
}

const pizzaSizes: PizzaSize[] = ["S", "M", "L"];

const StoreSizeGroupedBarChart = ({ orders }: StoreSizeGroupedBarChartProps) => {
  const { t, i18n } = useTranslation();
  const salesByStore = useMemo(() => {
    const counts = new Map<StoreLocation, Record<PizzaSize, number>>();

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const sizeCounts = counts.get(order.store) ?? { S: 0, M: 0, L: 0 };
        sizeCounts[item.size] += 1;
        counts.set(order.store, sizeCounts);
      });
    });

    return STORE_LOCATIONS.flatMap((store) => {
      const sizes = counts.get(store);
      return sizes ? [{ store, ...sizes }] : [];
    });
  }, [orders]);

  return (
    <ChartCard title={t("pizzaSalesBySize")}>
      {salesByStore.length === 0 ? (
        <ChartEmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={salesByStore}
            margin={{ top: 10, right: 12, left: 0, bottom: 4 }}
            barGap={5}
            barCategoryGap="22%"
          >
            <defs>
              <linearGradient id="pizza-size-s" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor={CHART_COLORS[0]} />
              </linearGradient>
              <linearGradient id="pizza-size-m" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#67E8F9" />
                <stop offset="100%" stopColor={CHART_COLORS[1]} />
              </linearGradient>
              <linearGradient id="pizza-size-l" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6EE7B7" />
                <stop offset="100%" stopColor={CHART_COLORS[2]} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#E9EDF5"
              strokeDasharray="3 6"
            />
            <XAxis
              dataKey="store"
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
                  valueFormatter={(value) =>
                    Number(value).toLocaleString(localeFor(i18n.language))
                  }
                />
              )}
              cursor={{ fill: "rgba(79, 70, 229, 0.05)" }}
            />
            <Legend
              content={() => (
                <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pb-2 text-xs text-gray-500">
                  {pizzaSizes.map((size, index) => (
                    <li key={size} className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: CHART_COLORS[index] }}
                      />
                      {t("size")} {size}
                    </li>
                  ))}
                </ul>
              )}
            />
            {pizzaSizes.map((size) => (
              <Bar
                key={size}
                dataKey={size}
                name={`${t("size")} ${size}`}
                fill={`url(#pizza-size-${size.toLowerCase()})`}
                radius={[5, 5, 1, 1]}
                maxBarSize={30}
                animationDuration={800}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default StoreSizeGroupedBarChart;
