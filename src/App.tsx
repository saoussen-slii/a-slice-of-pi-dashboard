import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  ReviewPieChart,
  StoreBarChart,
  MonthlyRevenueLineChart,
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
    <div className="w-full min-w-0 min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-3 py-2 sm:px-4 sm:py-3 text-center">
        <h1 className="m-0 font-bold tracking-tight text-gray-900">
          Slice of Pi Dashboard
        </h1>
      </header>

      <main className="mx-auto grid w-full min-w-0 max-w-6xl grid-cols-1 gap-3 p-2 sm:p-3 xl:grid-cols-2">
        <div className="xl:col-span-2">
          <DateFilters
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />
        </div>
        <div className="xl:col-span-2">
          <TotalRevenueCard />
        </div>

        <section
          aria-label="Dashboard charts"
          tabIndex={0}
          className="xl:col-span-2 max-h-[70vh] overflow-y-auto overscroll-contain pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
        >
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            <div className="xl:col-span-2">
              <MonthlyRevenueLineChart orders={filteredOrders} />
            </div>
            <StoreBarChart orders={filteredOrders} />
            <ReviewPieChart reviews={filteredReviews} />
          </div>
        </section>
      </main>

      <footer className="mt-3 border-t border-gray-200 bg-white px-3 py-2 text-center text-xs text-gray-500 sm:mt-4 sm:py-3">
        <p>© 2026 A Slice of Pi</p>
      </footer>
    </div>
  );
};

export default App;
