import { storageRef } from '../../firebase';

export const getGalleryImageDownloadURL = async (fileName: string) => {
  return storageRef
    .child('gallery-images')
    .child(fileName)
    .getDownloadURL();
};
