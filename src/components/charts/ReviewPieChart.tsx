import { PieChart, Legend, ResponsiveContainer, Pie, Tooltip } from "recharts";
import type { Review } from "../../types.ts";
import { CHART_COLORS } from "../../constants";
import { getFrequencyCount } from "../../utils";
import { ChartCard, ChartEmptyState, ChartTooltip } from "../../common";

interface ReviewPieChartProps {
  reviews: Review[];
}

const ReviewPieChart = ({ reviews }: ReviewPieChartProps) => {
  const sentimentCounts = getFrequencyCount(reviews, "sentiment").map(
    (sentiment, index) => ({
      ...sentiment,
      fill: CHART_COLORS[index % CHART_COLORS.length],
    }),
  );

  return (
    <ChartCard title="Review Sentiment Distribution">
      {sentimentCounts.length === 0 ? (
        <ChartEmptyState height={190} />
      ) : (
        <div className="pt-2">
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie
                data={sentimentCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="52%"
                innerRadius={54}
                outerRadius={82}
                paddingAngle={4}
                cornerRadius={5}
                stroke="#fff"
                strokeWidth={3}
                animationDuration={900}
              />
              <Tooltip
                content={(props) => (
                  <ChartTooltip
                    {...props}
                    valueFormatter={(value) => Number(value).toLocaleString()}
                  />
                )}
              />
              <Legend
                position="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 11, color: "#64748B" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  );
};

export default ReviewPieChart;
