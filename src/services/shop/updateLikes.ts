import { productsRef } from '../../firebase';

export const updateLikes = (productId: string, likedByList: string[]) => {
  return productsRef
    .child(productId)
    .child('likedBy')
    .set(likedByList);
};
