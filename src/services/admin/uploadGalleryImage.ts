import { storageRef } from '../../firebase';

export const uploadGalleryImage = (file: any, fileName: string) => {
  return storageRef
    .child('gallery-images')
    .child(fileName)
    .put(file)
    .then(result => console.log(1))
    .catch(err => console.log(err));
};
