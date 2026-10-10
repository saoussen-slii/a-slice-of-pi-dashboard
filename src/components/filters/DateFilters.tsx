import type { ChangeEvent } from "react";

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
  return (
    <fieldset className="flex h-full w-full min-w-0 flex-col justify-center rounded-xl border border-indigo-100 bg-gradient-to-br from-white via-white to-indigo-50/70 p-6 text-left shadow-sm sm:p-8">
      <legend className="sr-only">Filter orders by date</legend>
      <div className="flex flex-col gap-4 sm:flex-row">
        <label className="flex min-w-0 flex-1 flex-col gap-1.5 text-xs font-semibold text-gray-600">
          Start date
          <input
            type="date"
            value={startDate}
            max={endDate || undefined}
            onChange={onStartDateChange}
            className="w-full rounded-lg border border-indigo-100 bg-white/90 px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm shadow-indigo-950/[0.03] transition-all hover:border-indigo-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 [color-scheme:light]"
          />
        </label>
        <label className="flex min-w-0 flex-1 flex-col gap-1.5 text-xs font-semibold text-gray-600">
          End date
          <input
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={onEndDateChange}
            className="w-full rounded-lg border border-indigo-100 bg-white/90 px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm shadow-indigo-950/[0.03] transition-all hover:border-indigo-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 [color-scheme:light]"
          />
        </label>
      </div>
    </fieldset>
  );
};
export default DateFilters;
