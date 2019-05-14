export interface Product {
  title: string;
  title_ua: string;
  images: string[];
  price: number;
  currency: string;
  available: boolean;
  description?: string;
  description_ua?: string;
  inCart?: boolean;
  id?: string;
  key?: number;
  isLiked?: boolean;
}
