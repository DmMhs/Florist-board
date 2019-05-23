import { storageRef } from '../../firebase';
import { Product } from '../../models/Product';

export interface productData {
  title: string;
  title_ua: string;
  price: number;
  available: boolean;
  description: string;
  description_ua: string;
  currency: string;
  images: File[];
}

export const uploadProductImagesAndReturnURLs = (
  images: File[],
  productData: productData
) => {
  return Promise.all(
    images.map(async (image: File) => {
      const file = (image as any)[0];
      const formattedFileName = (image as any)[0].name.split('.')[0];
      await storageRef
        .child('products-images')
        .child(productData.title.toLowerCase())
        .child(formattedFileName)
        .put(file)
        .catch(err => {
          console.log(err);
        });

      const imageURL = await storageRef
        .child('products-images')
        .child(productData.title.toLowerCase())
        .child(formattedFileName)
        .getDownloadURL()
        .catch(err => console.log(err));
      return imageURL;
    })
  );
};
