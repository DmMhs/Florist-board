import { homeImagesRef, storageRef } from '../../firebase';

const getKeyByValue = (object: { [key: string]: string }, value: string) => {
  return Object.keys(object).find(key => object[key] === value);
};

const map = { first: '1', second: '2' };

export const deleteBannerImage = (imageName: string, imageUrl: string) => {
  const confirm = window.confirm('Are you sure?');
  if (confirm) {
    return storageRef
      .child('banner')
      .child(imageName)
      .delete()
      .then(response => {
        return homeImagesRef
          .once('value')
          .then(snapshot => {
            const imageKey = getKeyByValue(snapshot!.val(), imageUrl);
            return homeImagesRef.child(imageKey as string).remove();
          })
          .catch(err => console.log(err));
      });
  }
};
