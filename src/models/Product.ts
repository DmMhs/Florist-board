export interface Product {
  title: string;
  title_uk: string;
  images: string[];
  price: number;
  currency: string;
  available: boolean;
  description?: string;
  description_uk?: string;
  inCart?: boolean;
  id?: string;
  key?: number;
  isLiked?: boolean;
}
