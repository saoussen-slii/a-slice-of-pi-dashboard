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
          Type de pizza
        </label>
        <select
          id="pizza-type"
          value={pizzaType}
          onChange={(event) =>
            onPizzaTypeChange(event.target.value as PizzaType | "")
          }
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">Tous les types</option>
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
          Taille de pizza
        </label>
        <select
          id="pizza-size"
          value={pizzaSize}
          onChange={(event) =>
            onPizzaSizeChange(event.target.value as PizzaSize | "")
          }
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">Toutes les tailles</option>
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
