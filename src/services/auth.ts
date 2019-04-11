import axios from 'axios';

export let authInProgress: boolean | undefined;

export const signUp = (email: string, password: string) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };
  authInProgress = true;
  axios
    .post(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB7esiw1XYzS2_hllELqqYzqN5wIQav0Oc',
      authData
    )
    .then(response => {
      console.log(response.data);
      authInProgress = false;
    })
    .catch(err => {
      console.log(err);
    });
};

export const signIn = (email: string, password: string) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };
  authInProgress = true;
  axios
    .post(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB7esiw1XYzS2_hllELqqYzqN5wIQav0Oc',
      authData
    )
    .then(response => {
      console.log(response.data);
      authInProgress = false;
      console.log(authInProgress);
    })
    .catch(err => {
      console.log(err);
    });
};
