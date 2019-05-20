import firebase from 'firebase';

export const getIdToken = () => {
  return firebase
    .auth()
    .currentUser!.getIdToken(true)
    .then(idToken => {
      return idToken;
    })
    .catch(error => {
      console.log(error);
    });
};
