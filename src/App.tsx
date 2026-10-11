import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ReviewPieChart,
  StoreBarChart,
  MonthlyRevenueLineChart,
  StoreSizeGroupedBarChart,
} from "./components/charts";
import { DateFilters } from "./components/filters";
import TotalRevenueCard from "./components/kpi";
import { orders, reviews } from "./data";
import type { Order, Review } from "./types.ts";
import { filterByDateRange } from "./utils";
import { DASHBOARD_YEAR } from "./constants";

const allOrders = orders as Order[];

const App = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? i18n.language;
  const selectedLanguage = language.split("-")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const filteredOrders = useMemo(
    () => filterByDateRange(allOrders, startDate, endDate),
    [allOrders, startDate, endDate],
  );

  const filteredReviews = useMemo(
    () => filterByDateRange(reviews as Review[], startDate, endDate),
    [reviews, startDate, endDate],
  );

  return (
    <div
      lang={selectedLanguage}
      className="flex h-dvh w-full min-w-0 flex-col overflow-hidden bg-gray-50"
    >
      <header className="shrink-0 border-b border-indigo-100 bg-indigo-50 px-4 py-3 text-indigo-950 shadow-sm sm:px-6">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <h1 className="m-0 min-w-0 text-left text-base font-semibold tracking-tight text-indigo-950 sm:text-xl">
            {t("dashboardTitle")}
          </h1>
          <div
            role="group"
            aria-label={t("selectLanguage")}
            className="flex shrink-0 items-center rounded-lg border border-indigo-200 bg-white/80 p-1 shadow-sm"
          >
            {(["en", "fr"] as const).map((option) => (
              <button
                key={option}
                type="button"
                lang={option}
                aria-pressed={selectedLanguage === option}
                onClick={() => void i18n.changeLanguage(option)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 sm:text-sm ${
                  selectedLanguage === option
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-indigo-700 hover:bg-indigo-50"
                }`}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-0 w-full min-w-0 max-w-7xl flex-1 flex-col px-4 pb-4 pt-6 sm:px-6 sm:pb-6 lg:px-8">
        <div className="mb-6 grid w-full shrink-0 grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-6">
          <TotalRevenueCard />
          <div className="w-full">
            <DateFilters
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          </div>
        </div>
        <section
          aria-label={t("dashboardCharts")}
          tabIndex={0}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-1 pb-2 pt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <MonthlyRevenueLineChart orders={filteredOrders} />
            </div>
            <StoreBarChart orders={filteredOrders} />
            <ReviewPieChart reviews={filteredReviews} />
            <StoreSizeGroupedBarChart orders={filteredOrders} />
          </div>
        </section>
      </main>

      <footer className="shrink-0 border-t border-gray-200 bg-white px-3 py-2 text-center text-xs text-gray-500">
        <p>© {DASHBOARD_YEAR} A Slice of Pi</p>
      </footer>
    </div>
  );
};

export default App;
