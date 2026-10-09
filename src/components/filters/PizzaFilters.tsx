import type { ChangeEvent } from "react";
import type { PizzaSize, PizzaType } from "../../types.ts";

interface PizzaFiltersProps {
  pizzaType: PizzaType | "";
  pizzaSize: PizzaSize | "";
  onPizzaTypeChange: (value: PizzaType | "") => void;
  onPizzaSizeChange: (value: PizzaSize | "") => void;
}

const pizzaTypes: PizzaType[] = [
  "Cheese",
  "Deluxe",
  "Hawaiian",
  "Meatlovers",
  "Pepperoni",
];
const pizzaSizes: PizzaSize[] = ["S", "M", "L"];

const PizzaFilters = ({
  pizzaType,
  pizzaSize,
  onPizzaTypeChange,
  onPizzaSizeChange,
}: PizzaFiltersProps) => {
  const handlePizzaTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onPizzaTypeChange(event.target.value as PizzaType | "");
  };
  const handlePizzaSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onPizzaSizeChange(event.target.value as PizzaSize | "");
  };

  return (
    <section
      aria-label="Filtres des commandes"
      className="mb-4 flex flex-col gap-3 sm:flex-row"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1 text-left">
        <label
          htmlFor="pizza-type"
          className="text-sm font-medium text-gray-700"
        >
          Pizza Type
        </label>
        <select
          id="pizza-type"
          value={pizzaType}
          onChange={handlePizzaTypeChange}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">All Types</option>
          {pizzaTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 text-left">
        <label
          htmlFor="pizza-size"
          className="text-sm font-medium text-gray-700"
        >
          Pizza Size
        </label>
        <select
          id="pizza-size"
          value={pizzaSize}
          onChange={handlePizzaSizeChange}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">All Sizes</option>
          {pizzaSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default PizzaFilters;
