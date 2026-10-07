export type PizzaSize = "S" | "M" | "L";

export type PizzaType =
  | "Cheese"
  | "Deluxe"
  | "Hawaiian"
  | "MeatLovers"
  | "Pepperoni";

export type StoreLocation =
  | "Kanata"
  | "Orleans"
  | "Downtown"
  | "Sandy Hill"
  | "The Glebe";

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
