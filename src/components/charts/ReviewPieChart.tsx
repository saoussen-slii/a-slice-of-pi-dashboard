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
import { CHART_COLORS } from "../../constants/chartColors.ts";
import { getSentimentCounts } from "../../utils/reviewUtil.ts";

const sentimentCounts = getSentimentCounts(reviews as Review[]);

const ReviewPieChart = () => {
  return (
    <div>
      <h2>Review Sentiment Distribution</h2>
      <p>
        This chart shows the distribution of customer reviews based on their
        sentiment.
      </p>
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
    </div>
  );
};
export default ReviewPieChart;
