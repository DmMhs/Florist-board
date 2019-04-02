export interface Product {
  title: string;
  images: string[];
  price: number;
  currency: string;
  available: boolean;
  inCart?: boolean;
  id?: string;
  key?: number;
}
