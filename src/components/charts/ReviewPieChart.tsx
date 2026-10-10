import { PieChart, Legend, ResponsiveContainer, Pie, Tooltip } from "recharts";
import { useTranslation } from "react-i18next";
import type { Review, Sentiment } from "../../types.ts";
import { CHART_COLORS } from "../../constants";
import { getFrequencyCount } from "../../utils";
import { ChartCard, ChartEmptyState, ChartTooltip } from "../../common";
import { localeFor } from "../../i18n";
import type { MessageKey } from "../../i18n";

interface ReviewPieChartProps {
  reviews: Review[];
}

const sentimentMessages: Record<Sentiment, MessageKey> = {
  angry: "angry",
  delighted: "delighted",
  happy: "happy",
  sad: "sad",
};

const ReviewPieChart = ({ reviews }: ReviewPieChartProps) => {
  const { t, i18n } = useTranslation();
  const sentimentCounts = getFrequencyCount(reviews, "sentiment").map(
    (sentiment, index) => ({
      ...sentiment,
      name: t(sentimentMessages[sentiment.name as Sentiment]),
      fill: CHART_COLORS[index % CHART_COLORS.length],
    }),
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
                    valueFormatter={(value) =>
                      Number(value).toLocaleString(localeFor(i18n.language))
                    }
                  />
                )}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={8}
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
