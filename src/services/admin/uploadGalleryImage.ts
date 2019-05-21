import { storageRef } from '../../firebase';

export const uploadGalleryImage = (file: any, fileName: string) => {
  storageRef
    .child('gallery-images')
    .child(fileName)
    .put(file)
    .catch(err => {
      console.log(err);
    });
};
