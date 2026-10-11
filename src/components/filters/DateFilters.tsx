import { parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import "react-datepicker/dist/react-datepicker.css";
import "./DateFilters.css";
import DatePickerField from "./DatePickerField";

const MIN_DATE = "2023-01-01";
const MAX_DATE = "2023-12-31";
const RANGE_HELP_ID = "date-range-help";
const minDate = parseISO(MIN_DATE);
const maxDate = parseISO(MAX_DATE);

type DateFiltersProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
};

const DateFilters = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateFiltersProps) => {
  const { t } = useTranslation();
  const selectedStartDate = startDate ? parseISO(startDate) : minDate;
  const selectedEndDate = endDate ? parseISO(endDate) : maxDate;

  return (
    <fieldset className="flex h-full w-full min-w-0 flex-col justify-center rounded-xl border border-indigo-100 bg-gradient-to-br from-white via-white to-indigo-50/70 p-6 text-left shadow-sm sm:p-8">
      <legend className="sr-only">{t("filterOrdersByDate")}</legend>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4 sm:flex-row">
          <DatePickerField
            id="start-date"
            label={t("startDate")}
            value={startDate}
            minDate={minDate}
            maxDate={selectedEndDate}
            rangeHelpId={RANGE_HELP_ID}
            onChange={onStartDateChange}
          />
          <DatePickerField
            id="end-date"
            label={t("endDate")}
            value={endDate}
            minDate={selectedStartDate}
            maxDate={maxDate}
            rangeHelpId={RANGE_HELP_ID}
            onChange={onEndDateChange}
          />
        </div>
        <p id={RANGE_HELP_ID} className="text-xs font-normal text-gray-500">
          {"* " + t("dateRangeInfo", { minDate: MIN_DATE, maxDate: MAX_DATE })}
        </p>
      </div>
    </fieldset>
  );
};
export default DateFilters;
