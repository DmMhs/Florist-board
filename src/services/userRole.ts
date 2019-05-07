import firebase from 'firebase';

export const userRole = () => {
  if (
    firebase.auth().currentUser === null ||
    firebase.auth().currentUser === undefined
  ) {
    return;
  }
  return firebase
    .auth()
    .currentUser!.getIdTokenResult()
    .then(result => {
      console.log('userRole func: ' + result.claims.role);
      return result.claims.role === 'admin' ? 'admin' : 'user';
    })
    .catch(err => console.log(err));
};
