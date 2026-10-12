import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslation } from "react-i18next";
import { ChartCard, ChartEmptyState, ChartTooltip } from "../../common";
import { prices } from "../../data";
import type { Order } from "../../types.ts";
import { localeFor } from "../../i18n";
import { CHART_COLORS } from "../../constants";
import { calculateRevenueByStore } from "../../utils";

interface StoreRevenueChartProps {
  orders: Order[];
}

const StoreRevenueChart = ({ orders }: StoreRevenueChartProps) => {
  const { t, i18n } = useTranslation();
  const revenueByStore = useMemo(
    () => calculateRevenueByStore(orders, prices),
    [orders],
  );
  const locale = localeFor(i18n.language);
  const formatCurrency = (value: number | string | readonly (number | string)[]) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(Number(value));
  const formatAxisCurrency = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CAD",
      notation: "compact",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <ChartCard title={t("revenueByStore")}>
      {revenueByStore.length === 0 ? (
        <ChartEmptyState height={190} reserveFilterSpace />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenueByStore}
            layout="vertical"
            margin={{ top: 8, right: 12, left: 4, bottom: 4 }}
          >
            <CartesianGrid
              horizontal={false}
              stroke="#E9EDF5"
              strokeDasharray="3 6"
            />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tickFormatter={formatAxisCurrency}
              tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 500 }}
            />
            <YAxis
              type="category"
              dataKey="store"
              width={88}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 10, fontWeight: 500 }}
            />
            <Tooltip
              content={(props) => (
                <ChartTooltip {...props} valueFormatter={formatCurrency} />
              )}
              cursor={{ fill: "rgba(79, 70, 229, 0.05)" }}
            />
            <Bar
              dataKey="revenue"
              name={t("revenue")}
              radius={[2, 7, 7, 2]}
              maxBarSize={24}
              fill={CHART_COLORS[0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default StoreRevenueChart;
