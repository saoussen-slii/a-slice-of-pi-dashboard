import { useTranslation } from "react-i18next";
import TotalRevenueIcon from "./TotalRevenueIcon.tsx";
import { calculateTotalRevenue } from "../../utils";
import { orders, prices } from "../../data";
import type { Order } from "../../types.ts";
import { localeFor } from "../../i18n";

const DEFAULT_YEAR = 2023;

const TotalRevenueCard = () => {
  const { t, i18n } = useTranslation();
  return (
    <section
      aria-labelledby="total-revenue-title"
      className="w-full rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50/70 p-6 text-left shadow-sm sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            id="total-revenue-title"
            className="text-sm font-semibold uppercase tracking-[0.12em] text-indigo-700"
          >
            {t("totalRevenue")} / {DEFAULT_YEAR}
          </h2>
          <p className="mt-3 text-4xl font-bold tracking-tight text-indigo-400 sm:text-5xl">
            {calculateTotalRevenue(
              orders as Order[],
              prices,
              DEFAULT_YEAR,
              localeFor(i18n.language),
            )}
          </p>
        </div>
        <TotalRevenueIcon />
      </div>
    </section>
  );
};
export default TotalRevenueCard;
