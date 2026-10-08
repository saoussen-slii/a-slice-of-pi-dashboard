import "./App.css";
import {
  ReviewPieChart,
  StoreBarChart,
  MonthlyRevenueLineChart,
} from "./components/charts";
import TotalRevenueCard from "./components/kpi";

const App = () => {
  return (
    <>
      <div>
        <header>
          <h1>Slice of Pi Dashboard</h1>
        </header>
        <section aria-label="Filtres du tableau de bord"></section>
        <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 p-4 md:grid-cols-2">
          <ReviewPieChart />
          <StoreBarChart />
          <TotalRevenueCard />

          <MonthlyRevenueLineChart />
        </main>
        <footer>
          <p>© 2026 A Slice of Pi</p>
        </footer>
      </div>
    </>
  );
};

export default App;
