export interface CartItem {
  title: string;
  images: string[];
  price: number;
  currency: string;
  available: boolean;
  key: number;
  id: string;
  addToCart: void;
  amount?: number;
}
