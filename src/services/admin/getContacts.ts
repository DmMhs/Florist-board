import { database } from '../../firebase';

export const getContacts = () => {
  return database
    .ref()
    .child('contacts')
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });
};
