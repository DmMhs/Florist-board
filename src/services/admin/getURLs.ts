import { database } from '../../firebase';

export const getURLs = async () => {
  return database
    .ref()
    .child('urls')
    .once('value')
    .then(snapshot => {
      return snapshot!.val();
    });
};
