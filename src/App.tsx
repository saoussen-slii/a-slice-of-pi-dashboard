import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ReviewPieChart,
  StoreBarChart,
  MonthlyRevenueLineChart,
  StoreSizeGroupedBarChart,
  StoreRevenueChart,
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
      <header className="shrink-0 border-b border-indigo-100 bg-indigo-50 px-4 py-2.5 text-indigo-950 shadow-sm sm:px-6">
        <div className="flex w-full items-center justify-between gap-3">
          <h1 className="m-0 min-w-0 text-left text-base font-semibold tracking-tight text-indigo-950 sm:text-xl">
            <span aria-hidden="true">🍕 </span>
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

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col px-3 pb-3 pt-4 sm:px-6 sm:pb-4 sm:pt-5">
        <div className="mb-4 grid w-full shrink-0 grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-6">
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
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-0 pb-2 pt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
        >
          <div className="flex h-full min-h-full flex-col gap-4 md:gap-6">
            <div className="grid flex-1 auto-rows-[minmax(280px,1fr)] grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <MonthlyRevenueLineChart orders={filteredOrders} />
              <ReviewPieChart reviews={filteredReviews} />
            </div>
            <div className="grid flex-1 auto-rows-[minmax(280px,1fr)] grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
              <StoreSizeGroupedBarChart orders={filteredOrders} />
              <StoreRevenueChart orders={filteredOrders} />
              <StoreBarChart orders={filteredOrders} />
            </div>
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
