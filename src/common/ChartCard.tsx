interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard = ({ title, children }: ChartCardProps) => (
  <section className="chart-card group flex min-w-0 flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-950/5">
    <header className="flex items-center gap-2.5">
      <span className="h-5 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-400" />
      <h2>{title}</h2>
    </header>
    <div>{children}</div>
  </section>
);
