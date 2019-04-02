import react from 'react';
export interface CartItem  {
  title: string;
  images: string[];
  price: number;
  currency: string;
  available: boolean;
  key: number;
  id: string;
  inCart: boolean;
  addToCart: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  remove?: void;
  amount?: number;
}
