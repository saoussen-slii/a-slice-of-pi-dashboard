import {
  PieChart,
  Legend,
  ResponsiveContainer,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import type { Review } from "../../types.ts";
import { CHART_COLORS } from "../../constants";
import { getFrequencyCount } from "../../utils";
import { ChartCard, ChartEmptyState, ChartTooltip } from "../../common";

interface ReviewPieChartProps {
  reviews: Review[];
}

const ReviewPieChart = ({ reviews }: ReviewPieChartProps) => {
  const sentimentCounts = getFrequencyCount(reviews, "sentiment");

  return (
    <ChartCard title="Review Sentiment Distribution">
      {sentimentCounts.length === 0 ? (
        <ChartEmptyState height={190} />
      ) : (
        <ResponsiveContainer width="100%" height={190}>
          <PieChart>
            <Pie
              data={sentimentCounts}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="48%"
              innerRadius={54}
              outerRadius={82}
              paddingAngle={4}
              cornerRadius={5}
              stroke="#fff"
              strokeWidth={3}
              animationDuration={900}
            >
              {sentimentCounts.map((__, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              content={(props) => (
                <ChartTooltip
                  {...props}
                  valueFormatter={(value) => Number(value).toLocaleString()}
                />
              )}
            />
            <Legend
              align="center"
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11, color: "#64748B" }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default ReviewPieChart;
