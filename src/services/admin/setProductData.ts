import { productsRef } from '../../firebase';

interface productData {
  title: string;
  title_ua: string;
  images: File[];
  price: number;
  currency: string;
  available: boolean;
  description?: string;
  description_ua?: string;
}

export const setProductData = (id: string, productData: productData) => {
  return productsRef
    .child(id)
    .set({ ...productData })
    .catch(err => console.log(err));
};
