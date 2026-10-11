import type { Sentiment } from "../types.ts";

export const CHART_COLORS = [
  "#4F46E5",
  "#06B6D4",
  "#10B981",
  "#F43F5E",
  "#84CC16",
];

export const REVIEW_SENTIMENTS = {
  delighted: { color: "#10B981", emoji: "🤩", label: "delighted" },
  happy: { color: "#F59E0B", emoji: "😊", label: "happy" },
  sad: { color: "#3B82F6", emoji: "😢", label: "sad" },
  angry: { color: "#EF4444", emoji: "😡", label: "angry" },
} as const satisfies Record<
  Sentiment,
  { color: string; emoji: string; label: Sentiment }
>;
