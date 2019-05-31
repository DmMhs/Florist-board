import { storageRef } from '../../firebase';

export const uploadBannerImage = (file: File, fileName: string) => {
  return storageRef
    .child('banner')
    .child(fileName)
    .put(file)
    .catch(err => console.log(err));
};
