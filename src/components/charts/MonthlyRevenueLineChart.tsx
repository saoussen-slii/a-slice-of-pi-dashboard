import {
  Area,
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useTranslation } from "react-i18next";

import { prices } from "../../data";
import type { Order } from "../../types.ts";
import { CHART_COLORS, DASHBOARD_YEAR } from "../../constants";
import { calculateTotalRevenueByMonth } from "../../utils";
import { ChartCard, ChartEmptyState, ChartTooltip } from "../../common";
import { localeFor } from "../../i18n";

interface MonthlyRevenueLineChartProps {
  orders: Order[];
}

const MonthlyRevenueLineChart = ({ orders }: MonthlyRevenueLineChartProps) => {
  const { t, i18n } = useTranslation();
  const monthlyRevenueData = calculateTotalRevenueByMonth(orders, prices);
  const locale = localeFor(i18n.language);
  const formatCurrency = (
    value: number | string | readonly (number | string)[],
  ) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(Number(value));

  return (
    <ChartCard title={`${t("monthlyRevenue")} ${DASHBOARD_YEAR}`}>
      {monthlyRevenueData.length === 0 ? (
        <ChartEmptyState height={190} reserveFilterSpace />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={monthlyRevenueData}
            margin={{
              top: 12,
              right: 12,
              left: 4,
              bottom: 4,
            }}
          >
            <defs>
              <linearGradient
                id="monthly-revenue-fill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={CHART_COLORS[0]}
                  stopOpacity={0.3}
                />
                <stop
                  offset="90%"
                  stopColor={CHART_COLORS[0]}
                  stopOpacity={0.01}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#E9EDF5"
              strokeDasharray="3 6"
            />
            <XAxis
              dataKey="month"
              className="responsive-x-axis"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
              tickFormatter={(month: number) =>
                new Date(DASHBOARD_YEAR, month, 1)
                  .toLocaleString(locale, { month: "short" })
                  .replace(/\.$/, "")
              }
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={54}
              tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 500 }}
              tickFormatter={(value: number) =>
                locale.startsWith("fr")
                  ? `${value >= 1000 ? `${Math.round(value / 1000)} k` : value}\u00a0$`
                  : `$${value >= 1000 ? `${Math.round(value / 1000)}k` : value}`
              }
            />
            <Tooltip
              content={(props) => (
                <ChartTooltip
                  {...props}
                  valueFormatter={formatCurrency}
                  monthLabel
                />
              )}
              cursor={{ stroke: "#A5B4FC", strokeDasharray: "4 4" }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={CHART_COLORS[0]}
              strokeWidth={3}
              fill="url(#monthly-revenue-fill)"
              activeDot={{
                r: 6,
                fill: "#fff",
                stroke: CHART_COLORS[0],
                strokeWidth: 3,
              }}
              dot={{
                r: 3,
                fill: "#fff",
                stroke: CHART_COLORS[0],
                strokeWidth: 2,
              }}
              isAnimationActive
              animationDuration={900}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default MonthlyRevenueLineChart;
