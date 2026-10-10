export type PizzaSize = "S" | "M" | "L";

export type PizzaType =
  | "Cheese"
  | "Deluxe"
  | "Hawaiian"
  | "Meatlovers"
  | "Pepperoni";

export const STORE_LOCATIONS = [
  "Kanata",
  "Orleans",
  "Downtown",
  "Sandy Hill",
  "The Glebe",
] as const;

export type StoreLocation = (typeof STORE_LOCATIONS)[number];

export type Sentiment = "delighted" | "happy" | "angry" | "sad";

export interface Order {
  order_id: number;
  store: StoreLocation;
  items: OrderItem[];
  date: string;
}

export interface OrderItem {
  type: PizzaType;
  size: PizzaSize;
}

export interface Review {
  review_id: number;
  sentiment: Sentiment;
  store: StoreLocation;
  date: string;
  message: string;
}

export type PriceGrid = Record<PizzaType, Record<PizzaSize, number>>;
