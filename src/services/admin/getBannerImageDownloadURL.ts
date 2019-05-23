import { storageRef } from '../../firebase';

export const getBannerImageDownloadURL = async (fileName: string) => {
  return storageRef
    .child('banner')
    .child(fileName)
    .getDownloadURL();
};
