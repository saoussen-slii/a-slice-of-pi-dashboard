import { format, parseISO } from "date-fns";
import { enCA, frCA } from "date-fns/locale";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import "react-datepicker/dist/react-datepicker.css";
import "./DateFilters.css";

const MIN_DATE = "2023-01-01";
const MAX_DATE = "2023-12-31";
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
  const { t, i18n } = useTranslation();
  const locale = i18n.language.startsWith("fr") ? frCA : enCA;
  const selectedStartDate = startDate ? parseISO(startDate) : null;
  const selectedEndDate = endDate ? parseISO(endDate) : null;

  return (
    <fieldset className="flex h-full w-full min-w-0 flex-col justify-center rounded-xl border border-indigo-100 bg-gradient-to-br from-white via-white to-indigo-50/70 p-6 text-left shadow-sm sm:p-8">
      <legend className="sr-only">{t("filterOrdersByDate")}</legend>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-2 text-xs font-semibold text-indigo-950">
          <label htmlFor="start-date">{t("startDate")}</label>
          <span id="start-date-help" className="sr-only">
            {t("dateFormatHint")}
          </span>
          <DatePicker
            id="start-date"
            selected={selectedStartDate}
            openToDate={selectedStartDate ?? minDate}
            onChange={(date: Date | null) =>
              onStartDateChange(date ? format(date, "yyyy-MM-dd") : "")
            }
            minDate={minDate}
            maxDate={selectedEndDate ?? maxDate}
            dateFormat="yyyy-MM-dd"
            locale={locale}
            strictParsing
            ariaDescribedBy="start-date-help"
            previousMonthAriaLabel={t("previousMonth")}
            previousMonthButtonLabel={t("previousMonth")}
            nextMonthAriaLabel={t("nextMonth")}
            nextMonthButtonLabel={t("nextMonth")}
            previousYearAriaLabel={t("previousYear")}
            previousYearButtonLabel={t("previousYear")}
            nextYearAriaLabel={t("nextYear")}
            nextYearButtonLabel={t("nextYear")}
            calendarClassName="dashboard-date-calendar"
            popperClassName="dashboard-date-popper"
            wrapperClassName="w-full"
            placeholderText={t("dateFormatHint")}
            className="w-full rounded-xl border border-indigo-100 bg-white px-4 py-3 text-sm font-medium tracking-wide text-gray-800 shadow-sm shadow-indigo-950/[0.04] transition duration-200 placeholder:text-gray-400 hover:border-indigo-300 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 text-xs font-semibold text-indigo-950">
          <label htmlFor="end-date">{t("endDate")}</label>
          <span id="end-date-help" className="sr-only">
            {t("dateFormatHint")}
          </span>
          <DatePicker
            id="end-date"
            selected={selectedEndDate}
            openToDate={selectedEndDate ?? minDate}
            onChange={(date: Date | null) =>
              onEndDateChange(date ? format(date, "yyyy-MM-dd") : "")
            }
            minDate={selectedStartDate ?? minDate}
            maxDate={maxDate}
            dateFormat="yyyy-MM-dd"
            locale={locale}
            strictParsing
            ariaDescribedBy="end-date-help"
            previousMonthAriaLabel={t("previousMonth")}
            previousMonthButtonLabel={t("previousMonth")}
            nextMonthAriaLabel={t("nextMonth")}
            nextMonthButtonLabel={t("nextMonth")}
            previousYearAriaLabel={t("previousYear")}
            previousYearButtonLabel={t("previousYear")}
            nextYearAriaLabel={t("nextYear")}
            nextYearButtonLabel={t("nextYear")}
            calendarClassName="dashboard-date-calendar"
            popperClassName="dashboard-date-popper"
            wrapperClassName="w-full"
            placeholderText={t("dateFormatHint")}
            className="w-full rounded-xl border border-indigo-100 bg-white px-4 py-3 text-sm font-medium tracking-wide text-gray-800 shadow-sm shadow-indigo-950/[0.04] transition duration-200 placeholder:text-gray-400 hover:border-indigo-300 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          />
        </div>
      </div>
    </fieldset>
  );
};
export default DateFilters;
