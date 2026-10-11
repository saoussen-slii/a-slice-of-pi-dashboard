import type { TooltipContentProps, TooltipValueType } from "recharts";
import { useTranslation } from "react-i18next";
import { CHART_COLORS } from "../constants";
import { localeFor } from "../i18n";
import type { MessageKey } from "../i18n";

interface ChartTooltipProps extends Pick<
  TooltipContentProps,
  "active" | "payload" | "label"
> {
  valueFormatter?: (value: TooltipValueType) => string;
  monthLabel?: boolean;
}

const ChartTooltip = ({
  active,
  label,
  payload,
  valueFormatter = (value) => String(value),
  monthLabel = false,
}: ChartTooltipProps) => {
  const { i18n, t } = useTranslation();
  if (!active || !payload?.length) return null;

  const localizedLabel =
    monthLabel && typeof label === "number"
      ? new Date(2023, label, 1).toLocaleString(localeFor(i18n.language), {
          month: "long",
        })
      : String(label ?? "");

  return (
    <div className="min-w-36 rounded-xl border border-gray-100 bg-white/95 px-3.5 py-3 shadow-xl shadow-gray-900/10 backdrop-blur-sm">
      <p className="mb-2.5 text-xs font-semibold tracking-wide text-gray-900">
        {localizedLabel}
      </p>
      <div className="space-y-2">
        {payload.map((entry, index) => {
          const rawName = String(entry.name ?? entry.dataKey ?? "");
          const translationKey = tooltipTranslationKey(rawName);
          const sizeSuffix = rawName.match(/^Size ([SML])$/)?.[1];
          const name = sizeSuffix
            ? `${t("size")} ${sizeSuffix}`
            : translationKey
              ? t(translationKey)
              : rawName;
          const entryColor = String(entry.color ?? entry.fill ?? "");
          const sizeColorIndex = ["Size S", "Size M", "Size L"].indexOf(
            rawName,
          );
          const color =
            entryColor.startsWith("url(") || !entryColor
              ? CHART_COLORS[
                  sizeColorIndex >= 0
                    ? sizeColorIndex
                    : index % CHART_COLORS.length
                ]
              : entryColor;

          return (
            <div
              key={`${name}-${index}`}
              className="flex items-center justify-between gap-6 text-xs"
            >
              <span className="flex items-center gap-2 text-gray-500">
                <span
                  className="h-2 w-2 rounded-full ring-2 ring-offset-1"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 0 2px ${color}33`,
                  }}
                />
                {name}
              </span>
              <span className="font-semibold tabular-nums text-gray-900">
                {valueFormatter(entry.value ?? 0)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const tooltipTranslationKey = (name: string): MessageKey | undefined => {
  if (name === "Orders") return "orders";
  return undefined;
};

export default ChartTooltip;
