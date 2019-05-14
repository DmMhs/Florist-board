import { storageRef, productsRef } from '../firebase';

export const deleteProductImages = (id: string, folderName: string) => {
  return productsRef
    .child(id)
    .once('value')
    .then(snapshot => {
      const images = snapshot!.val().images;
      images.map(async (image: string) => {
        const rawName = storageRef
          .child('products-images')
          .child(folderName)
          .child(image)
          .name.split('%2F')[2];
        const readyName = rawName.split('?')[0];
        return storageRef
          .child('products-images')
          .child(folderName)
          .child(readyName)
          .delete()
          .catch(err => {
            console.log(err);
          });
      });
    });
};
