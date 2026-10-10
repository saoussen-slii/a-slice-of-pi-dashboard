import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
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

const allOrders = orders as Order[];

const App = () => {
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

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.currentTarget.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.currentTarget.value);
  };

  return (
    <div className="flex h-dvh w-full min-w-0 flex-col overflow-hidden bg-gray-50">
      <header className="shrink-0 border-b border-indigo-100 bg-indigo-50 px-4 py-3 text-indigo-950 shadow-sm sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2">
          <h1 className="m-0 justify-self-start text-left text-lg font-semibold tracking-tight text-indigo-950 sm:text-xl">
            🍕 Slice of Pi Dashboard
          </h1>
          <div aria-hidden="true" />
        </div>
      </header>

      <main className="mx-auto flex min-h-0 w-full min-w-0 max-w-6xl flex-1 flex-col gap-3 px-2 pb-2 pt-5 sm:px-3 sm:pb-3 sm:pt-6">
        <div className="shrink-0">
          <DateFilters
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />
        </div>
        <div className="shrink-0">
          <TotalRevenueCard />
        </div>

        <section
          aria-label="Dashboard charts"
          tabIndex={0}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
        <p>© 2023 A Slice of Pi</p>
      </footer>
    </div>
  );
};

export default App;
