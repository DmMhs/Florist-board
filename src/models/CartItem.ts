import React from 'react';
export interface CartItem {
  title: string;
  title_uk: string;
  images: string[];
  price: number;
  currency: string;
  available: boolean;
  key?: number;
  id: string;
  inCart: boolean;
  description?: string;
  description_uk?: string;
  likedBy?: boolean | string[];
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
