import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import type { PizzaSize, PizzaType } from "../../types.ts";
import type { MessageKey } from "../../i18n";
import { PIZZA_SIZES } from "../../constants";

interface PizzaFiltersProps {
  pizzaType: PizzaType | "";
  pizzaSize: PizzaSize | "";
  onPizzaTypeChange: (value: PizzaType | "") => void;
  onPizzaSizeChange: (value: PizzaSize | "") => void;
}

const pizzaTypes: { value: PizzaType; label: MessageKey }[] = [
  { value: "Cheese", label: "cheese" },
  { value: "Deluxe", label: "deluxe" },
  { value: "Hawaiian", label: "hawaiian" },
  { value: "Meatlovers", label: "meatlovers" },
  { value: "Pepperoni", label: "pepperoni" },
];

const PizzaFilters = ({
  pizzaType,
  pizzaSize,
  onPizzaTypeChange,
  onPizzaSizeChange,
}: PizzaFiltersProps) => {
  const { t } = useTranslation();
  const handlePizzaTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onPizzaTypeChange(event.target.value as PizzaType | "");
  };
  const handlePizzaSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onPizzaSizeChange(event.target.value as PizzaSize | "");
  };

  return (
    <fieldset className="mb-2 flex w-full min-w-0 flex-col gap-2 border-0 p-0 sm:flex-row">
      <legend className="sr-only">{t("filterOrdersByPizza")}</legend>
      <div className="flex min-w-0 flex-1 flex-col gap-1 text-left">
        <label
          htmlFor="pizza-type"
          className="text-xs font-medium text-gray-600"
        >
          {t("pizzaType")}
        </label>
        <select
          id="pizza-type"
          value={pizzaType}
          onChange={handlePizzaTypeChange}
          className="w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-900 shadow-sm transition-colors hover:border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">{t("allTypes")}</option>
          {pizzaTypes.map(({ value, label }) => (
            <option key={value} value={value}>
              {t(label)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 text-left">
        <label
          htmlFor="pizza-size"
          className="text-xs font-medium text-gray-600"
        >
          {t("pizzaSize")}
        </label>
        <select
          id="pizza-size"
          value={pizzaSize}
          onChange={handlePizzaSizeChange}
          className="w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-900 shadow-sm transition-colors hover:border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">{t("allSizes")}</option>
          {PIZZA_SIZES.map((size: PizzaSize) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
};

export default PizzaFilters;
