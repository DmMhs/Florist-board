import { productsRef } from '../../firebase';

export const deleteProductImagesFromDB = (id: string) => {
  return productsRef
    .child(id)
    .child('images')
    .remove()
    .catch(err => console.log(err));
};
