export interface Product {
  title: string;
  images: string[];
  price: number;
  currency: string;
  available: boolean;
  description?: string;
  inCart?: boolean;
  id?: string;
  key?: number;
  isLiked?: boolean;
}
