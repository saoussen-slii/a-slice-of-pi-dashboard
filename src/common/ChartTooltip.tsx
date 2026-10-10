import type { TooltipContentProps, TooltipValueType } from "recharts";
import { CHART_COLORS } from "../constants";

interface ChartTooltipProps
  extends Pick<TooltipContentProps, "active" | "payload" | "label"> {
  valueFormatter?: (value: TooltipValueType) => string;
}

const ChartTooltip = ({
  active,
  label,
  payload,
  valueFormatter = (value) => String(value),
}: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-36 rounded-xl border border-gray-100 bg-white/95 px-3.5 py-3 shadow-xl shadow-gray-900/10 backdrop-blur-sm">
      <p className="mb-2.5 text-xs font-semibold tracking-wide text-gray-900">
        {String(label ?? "")}
      </p>
      <div className="space-y-2">
        {payload.map((entry, index) => {
          const name = String(entry.name ?? entry.dataKey ?? "");
          const entryColor = String(entry.color ?? entry.fill ?? "");
          const sizeColorIndex = ["Size S", "Size M", "Size L"].indexOf(name);
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

export default ChartTooltip;
