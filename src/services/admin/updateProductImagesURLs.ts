import { productsRef } from '../../firebase';

export const updateProductImagesURLs = (
  productKey: string,
  imagesURLs: string[]
) => {
  return productsRef
    .child(productKey)
    .update({
      images: imagesURLs
    })
    .catch(err => {
      console.log(err);
    });
};
