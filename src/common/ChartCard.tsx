interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard = ({ title, children }: ChartCardProps) => (
  <section className="chart-card flex min-w-0 flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm">
    <header>
      <h2>{title}</h2>
    </header>
    <div>{children}</div>
  </section>
);
