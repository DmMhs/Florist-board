import { storageRef } from '../../firebase';

export const uploadGalleryImage = (file: File, fileName: string) => {
  return storageRef
    .child('gallery-images')
    .child(fileName)
    .put(file)
    .catch(err => console.log(err));
};
