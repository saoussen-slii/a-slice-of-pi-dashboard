import type { Review, Sentiment } from "../types";

export interface SentimentCountItem {
  name: string;
  value: number;
}

export const getSentimentCounts = (reviews: Review[]): SentimentCountItem[] => {
  return Object.entries(
    reviews.reduce(
      (acc, { sentiment }) => {
        acc[sentiment] = (acc[sentiment] || 0) + 1;
        return acc;
      },
      {} as Record<Sentiment, number>,
    ),
  ).map(([name, value]) => ({ name, value }));
};
