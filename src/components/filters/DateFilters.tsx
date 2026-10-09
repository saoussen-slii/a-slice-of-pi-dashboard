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
    <fieldset className="mx-auto w-full max-w-sm rounded-lg border border-gray-200 bg-white p-2.5 shadow-sm">
      <legend className="px-1 text-sm font-semibold text-gray-800">
        Filter orders by date
      </legend>
      <div className="mt-1 flex flex-col gap-2 sm:flex-row">
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-xs font-medium text-gray-600">
          Start date
          <input
            type="date"
            value={startDate}
            max={endDate || undefined}
            onChange={onStartDateChange}
            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-normal text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-xs font-medium text-gray-600">
          End date
          <input
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={onEndDateChange}
            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-normal text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </label>
      </div>
    </fieldset>
  );
};
export default DateFilters;
