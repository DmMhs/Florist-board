import firebase from 'firebase';

export const createUserWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => {
      console.log(error);
    });
};
