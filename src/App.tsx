import { useState } from "react";
import type { ChangeEvent } from "react";
import {
  ReviewPieChart,
  StoreBarChart,
  MonthlyRevenueLineChart,
} from "./components/charts";
import { DateFilters } from "./components/filters";
import TotalRevenueCard from "./components/kpi";
import { orders } from "./data";
import type { Order } from "./types.ts";

const allOrders = orders as Order[];

const App = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.currentTarget.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.currentTarget.value);
  };

  return (
    <div className="w-full min-w-0 min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-4 py-6 sm:px-6 sm:py-8 text-center">
        <h1 className="m-0 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Slice of Pi Dashboard
        </h1>
      </header>

      <main className="mx-auto grid w-full min-w-0 max-w-6xl grid-cols-1 gap-6 p-4 xl:grid-cols-2">
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

        <div className="xl:col-span-2">
          <MonthlyRevenueLineChart />
        </div>

        <StoreBarChart orders={allOrders} />
        <ReviewPieChart />
      </main>

      <footer className="mt-8 border-t border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 sm:mt-10 sm:py-6">
        <p>© 2026 A Slice of Pi</p>
      </footer>
    </div>
  );
};

export default App;
