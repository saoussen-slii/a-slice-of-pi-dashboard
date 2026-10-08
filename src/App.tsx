import "./App.css";
import {
  ReviewPieChart,
  StoreBarChart,
  MonthlyRevenueLineChart,
} from "./components/charts";
import TotalRevenueCard from "./components/kpi";

const App = () => {
  return (
    <div className="w-full min-w-0 min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-4 py-6 sm:px-6 sm:py-8 text-center">
        <h1 className="m-0 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Slice of Pi Dashboard
        </h1>
      </header>

      <section aria-label="Filtres du tableau de bord"></section>

      <main className="mx-auto grid w-full min-w-0 max-w-6xl grid-cols-1 gap-6 p-4 xl:grid-cols-2">
        <div className="xl:col-span-2">
          <TotalRevenueCard />
        </div>

        <div className="xl:col-span-2">
          <MonthlyRevenueLineChart />
        </div>

        <StoreBarChart />
        <ReviewPieChart />
      </main>

      <footer className="mt-8 border-t border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 sm:mt-10 sm:py-6">
        <p>© 2026 A Slice of Pi</p>
      </footer>
    </div>
  );
};

export default App;
