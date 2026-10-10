import { useTranslation } from "react-i18next";
import { calculateTotalRevenue } from "../../utils";
import { orders, prices } from "../../data";
import type { Order } from "../../types.ts";
import { localeFor } from "../../i18n";

const TotalRevenueCard = () => {
  const { t, i18n } = useTranslation();
  return (
    <section
      aria-labelledby="total-revenue-title"
      className="w-full rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50/70 p-6 text-left shadow-sm sm:p-8"
    >
      <h2
        id="total-revenue-title"
        className="text-sm font-semibold uppercase tracking-[0.12em] text-indigo-700"
      >
        {t("totalRevenue")} / 2023
      </h2>
      <p className="mt-3 text-4xl font-bold tracking-tight text-indigo-400 sm:text-5xl">
        {calculateTotalRevenue(
          orders as Order[],
          prices,
          2023,
          localeFor(i18n.language),
        )}
      </p>
    </section>
  );
};
export default TotalRevenueCard;
