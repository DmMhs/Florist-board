import React from 'react';
export interface CartItem {
  title: string;
  images: string[];
  price: number;
  currency: string;
  available: boolean;
  key?: number;
  id: string;
  inCart: boolean;
  description?: string;
  likedBy?: boolean;
  addToCart?:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  remove?:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  increaseAmount?:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  reduceAmount?:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  amount?: number;
}
