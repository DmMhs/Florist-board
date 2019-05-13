import { storageRef, productsRef } from '../firebase';

export const deleteProductImagesByIdAndFolderName = (
  id: string,
  folderName: string
) => {
  return productsRef
    .child(id)
    .once('value')
    .then(snapshot => {
      console.log('1');
      console.log(snapshot!.val());
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
          .then(response => {
            console.log(readyName + ' DELETED!');
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
};
