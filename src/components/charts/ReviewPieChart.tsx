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
import { ChartCard, ChartEmptyState } from "../../common";

interface ReviewPieChartProps {
  reviews: Review[];
}

const ReviewPieChart = ({ reviews }: ReviewPieChartProps) => {
  const sentimentCounts = getFrequencyCount(reviews, "sentiment");

  return (
    <ChartCard title="Review Sentiment Distribution">
      {sentimentCounts.length === 0 ? (
        <ChartEmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={sentimentCounts}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {sentimentCounts.map((__, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default ReviewPieChart;
