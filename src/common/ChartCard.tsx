interface ChartCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const ChartCard = ({ title, subtitle, children }: ChartCardProps) => (
  <section className="chart-card min-w-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <header>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </header>
    <div>{children}</div>
  </section>
);
