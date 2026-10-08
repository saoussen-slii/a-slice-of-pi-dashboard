import "./App.css";
import { ReviewPieChart, StoreBarChart } from "./components/charts";
import TotalRevenueCard from "./components/kpi";
const App = () => {
  return (
    <>
      <div>
        <header>
          <h1>Tableau de bord Slice of Pi</h1>
        </header>
        <section aria-label="Filtres du tableau de bord"></section>
        <main>
          <ReviewPieChart />
          <StoreBarChart />
          <TotalRevenueCard />
        </main>
        <footer>
          <p>© 2026 A Slice of Pi</p>
        </footer>
      </div>
    </>
  );
};

export default App;
