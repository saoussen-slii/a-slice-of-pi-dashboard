import { PieChart, Legend, ResponsiveContainer, Pie, Tooltip } from "recharts";
import { useTranslation } from "react-i18next";
import type { Review, Sentiment } from "../../types.ts";
import { REVIEW_SENTIMENTS } from "../../constants";
import { formatNumber, getFrequencyCount } from "../../utils";
import { ChartCard, ChartEmptyState, ChartTooltip } from "../../common";

interface ReviewPieChartProps {
  reviews: Review[];
}

const ReviewPieChart = ({ reviews }: ReviewPieChartProps) => {
  const { t, i18n } = useTranslation();
  const sentimentCounts = getFrequencyCount(reviews, "sentiment").map(
    ({ name, value }) => {
      const sentiment = name as Sentiment;
      const config = REVIEW_SENTIMENTS[sentiment];
      return {
        value,
        sentiment,
        name: t(config.label),
        fill: config.color,
        emoji: config.emoji,
      };
    },
  );
  const emojiByName = Object.fromEntries(
    sentimentCounts.map(({ name, emoji }) => [name, emoji]),
  );

  return (
    <ChartCard title={t("reviewSentiment")}>
      {sentimentCounts.length === 0 ? (
        <ChartEmptyState height={190} reserveFilterSpace />
      ) : (
        <div className="pt-2">
          <ResponsiveContainer width="100%" height={200}>
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
              />
              <Tooltip
                content={(props) => (
                  <ChartTooltip
                    {...props}
                    emojiByName={emojiByName}
                    valueFormatter={(value) =>
                      formatNumber(Number(value), i18n.language)
                    }
                  />
                )}
              />
              <Legend
                content={() => (
                  <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-gray-600">
                    {sentimentCounts.map(({ sentiment, name, emoji }) => (
                      <li key={sentiment} className="flex items-center gap-1.5">
                        <span aria-hidden="true">{emoji}</span>
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                )}
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  fontSize: 11,
                  color: "#64748B",
                  paddingTop: 6,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  );
};

export default ReviewPieChart;
