import { format, parseISO } from "date-fns";
import { enCA, frCA } from "date-fns/locale";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { localeFor } from "../../i18n";

type DatePickerFieldProps = {
  id: string;
  label: string;
  value: string;
  minDate: Date;
  maxDate: Date;
  rangeHelpId: string;
  onChange: (date: string) => void;
};

const DatePickerField = ({
  id,
  label,
  value,
  minDate,
  maxDate,
  rangeHelpId,
  onChange,
}: DatePickerFieldProps) => {
  const { t, i18n } = useTranslation();
  const locale = localeFor(i18n.language) === "fr-CA" ? frCA : enCA;
  const selectedDate = value ? parseISO(value) : null;
  const formatHelpId = `${id}-format-help`;

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2 text-xs font-semibold text-indigo-950">
      <label htmlFor={id}>{label}</label>
      <span id={formatHelpId} className="sr-only">
        {t("dateFormatHint")}
      </span>
      <DatePicker
        id={id}
        selected={selectedDate}
        openToDate={selectedDate ?? minDate}
        onChange={(date: Date | null) =>
          onChange(date ? format(date, "yyyy-MM-dd") : "")
        }
        minDate={minDate}
        maxDate={maxDate}
        dateFormat="yyyy-MM-dd"
        locale={locale}
        strictParsing
        ariaDescribedBy={`${formatHelpId} ${rangeHelpId}`}
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
        placeholderText="yyyy-mm-dd"
        className="w-full rounded-xl border border-indigo-100 bg-white px-4 py-3 text-sm font-medium tracking-wide text-gray-800 shadow-sm shadow-indigo-950/[0.04] transition duration-200 placeholder:text-gray-400 hover:border-indigo-300 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  );
};

export default DatePickerField;
