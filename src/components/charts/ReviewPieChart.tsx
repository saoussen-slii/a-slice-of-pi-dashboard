import {
  PieChart,
  Legend,
  ResponsiveContainer,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import reviews from "../../data/review_data.json";
import type { Review } from "../../types.ts";
import { CHART_COLORS } from "../../constants";
import { getFrequencyCount } from "../../utils";
import { ChartCard } from "../../common";

const sentimentCounts = getFrequencyCount(reviews as Review[], "sentiment");

const ReviewPieChart = () => {
  return (
    <ChartCard
      title="Review Sentiment Distribution"
      subtitle="This chart shows the distribution of customer reviews based on their sentiment."
    >
      <ResponsiveContainer width="100%" height={400}>
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
            {sentimentCounts.map((entry, index) => (
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
    </ChartCard>
  );
};

export default ReviewPieChart;
