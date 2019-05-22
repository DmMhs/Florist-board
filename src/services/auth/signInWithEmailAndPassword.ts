import firebase from 'firebase';

export const signInWithEmailAndPassword = (email: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};
