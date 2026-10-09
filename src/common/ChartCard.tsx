interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard = ({ title, children }: ChartCardProps) => (
  <section className="chart-card flex min-w-0 flex-col gap-1.5 rounded-lg border border-gray-200 bg-white p-2.5 shadow-sm transition-shadow duration-200 hover:shadow-md">
    <header>
      <h2>{title}</h2>
    </header>
    <div>{children}</div>
  </section>
);
