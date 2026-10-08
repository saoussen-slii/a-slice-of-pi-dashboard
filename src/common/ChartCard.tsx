interface ChartCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const ChartCard = ({ title, subtitle, children }: ChartCardProps) => (
  <section className="chart-card">
    <header>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </header>
    <div>{children}</div>
  </section>
);
