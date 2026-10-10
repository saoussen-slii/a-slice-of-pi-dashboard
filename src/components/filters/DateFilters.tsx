import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { localeFor } from "../../i18n";

const MIN_DATE = "2023-01-01";
const MAX_DATE = "2023-12-31";

type DateFiltersProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const DateFilters = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateFiltersProps) => {
  const { t, i18n } = useTranslation();
  return (
    <fieldset className="flex h-full w-full min-w-0 flex-col justify-center rounded-xl border border-indigo-100 bg-gradient-to-br from-white via-white to-indigo-50/70 p-6 text-left shadow-sm sm:p-8">
      <legend className="sr-only">{t("filterOrdersByDate")}</legend>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 text-xs font-semibold text-gray-600">
          <label htmlFor="start-date">{t("startDate")}</label>
          <input
            id="start-date"
            type="date"
            lang={localeFor(i18n.language)}
            value={startDate}
            min={MIN_DATE}
            max={endDate && endDate < MAX_DATE ? endDate : MAX_DATE}
            onChange={onStartDateChange}
            className="w-full rounded-lg border border-indigo-100 bg-white/90 px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm shadow-indigo-950/[0.03] transition-all hover:border-indigo-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 [color-scheme:light]"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 text-xs font-semibold text-gray-600">
          <label htmlFor="end-date">{t("endDate")}</label>
          <input
            id="end-date"
            type="date"
            lang={localeFor(i18n.language)}
            value={endDate}
            min={startDate && startDate > MIN_DATE ? startDate : MIN_DATE}
            max={MAX_DATE}
            onChange={onEndDateChange}
            className="w-full rounded-lg border border-indigo-100 bg-white/90 px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm shadow-indigo-950/[0.03] transition-all hover:border-indigo-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 [color-scheme:light]"
          />
        </div>
      </div>
    </fieldset>
  );
};
export default DateFilters;
