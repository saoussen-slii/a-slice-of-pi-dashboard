import { useTranslation } from "react-i18next";

interface ChartEmptyStateProps {
  height?: number;
  reserveFilterSpace?: boolean;
}

const ChartEmptyState = ({
  height = 220,
  reserveFilterSpace = false,
}: ChartEmptyStateProps) => {
  const { t } = useTranslation();
  return (
    <>
      {reserveFilterSpace && (
        <div aria-hidden="true" className="h-28 sm:h-14" />
      )}
      <div className="flex items-center justify-center px-4" style={{ height }}>
        <div
          role="status"
          className="flex w-full max-w-sm flex-col items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50/70 px-6 py-5 text-center"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-indigo-500 shadow-sm">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M4 19.5h16M6.5 16V11m5 5V5m5 11v-7"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="text-sm font-semibold text-gray-800">{t("noData")}</p>
          <p className="text-xs leading-relaxed text-gray-600">
            {t("adjustFilters")}
          </p>
        </div>
      </div>
    </>
  );
};

export default ChartEmptyState;
