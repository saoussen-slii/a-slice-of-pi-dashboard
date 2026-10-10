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
    <fieldset className="w-full min-w-0 border-0 p-0 text-left">
      <legend className="sr-only px-1 text-sm font-semibold text-gray-800">
        Filter orders by date
      </legend>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-xs font-medium text-gray-600">
          Start date
          <input
            type="date"
            value={startDate}
            max={endDate || undefined}
            onChange={onStartDateChange}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-900 shadow-sm transition-colors hover:border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 [color-scheme:light]"
          />
        </label>
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-xs font-medium text-gray-600">
          End date
          <input
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={onEndDateChange}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-900 shadow-sm transition-colors hover:border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 [color-scheme:light]"
          />
        </label>
      </div>
    </fieldset>
  );
};
export default DateFilters;
