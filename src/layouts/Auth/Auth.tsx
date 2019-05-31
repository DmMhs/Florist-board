import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import {
  withRouter,
  RouteComponentProps as RCProps,
  NavLink
} from 'react-router-dom';

import { Popup } from '../../components';
import { AppContext } from '../../AppContext';
import { userRole } from '../../services/auth/userRole';
import { getIdToken } from '../../services/auth/getIdToken';
import { createUserWithEmailAndPassword } from '../../services/auth/createUserWithEmailAndPassword';
import { signInWithEmailAndPassword } from '../../services/auth/signInWithEmailAndPassword';
import './Auth.less';

interface MatchParams {
  mode: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

interface RouteComponentProps<P> {
  match: match<P>;
}

interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

interface AuthState {
  formData: {
    email: string;
    password: string;
  };
  mode: string;
}

class Auth extends Component<
  RouteComponentProps<MatchParams> & RCProps<{}>,
  AuthState
> {
  public static getDerivedStateFromProps(
    props: RouteComponentProps<MatchParams> & RCProps<{}>,
    state: AuthState
  ) {
    return {
      mode: props.match.params.mode
    };
  }

  constructor(props: RouteComponentProps<MatchParams> & RCProps<{}>) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: ''
      },
      mode: this.props.match.params.mode
    };
  }

  private redirectHandler = (path: string) => {
    (this.props as RouteComponentProps<MatchParams> & RCProps<{}>).history.push(
      path
    );
  };

  private emailInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFormData = { ...this.state.formData };
    updatedFormData.email = event.target.value;
    this.setState({
      formData: updatedFormData
    });
  };

  private passwordInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFormData = { ...this.state.formData };
    updatedFormData.password = event.target.value;
    this.setState({
      formData: updatedFormData
    });
  };

  private formSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const value = this.context;
    const initialFormData = {
      email: '',
      password: ''
    };
    const authData = {
      email: this.state.formData.email,
      password: this.state.formData.password,
      returnSecureToken: true
    };

    if (this.state.mode === 'signup') {
      this.setState({
        formData: initialFormData
      });
      await createUserWithEmailAndPassword(authData.email, authData.password);
      this.redirectHandler('/auth/signin');
    } else {
      this.setState({
        formData: initialFormData
      });
      await signInWithEmailAndPassword(authData.email, authData.password)
        .then(async response => {
          const idToken = await getIdToken();
          value.setUserCredentials(
            response.user!.email,
            response.user!.uid,
            idToken
          );
        })
        .catch(err => console.log(err));

      this.redirectHandler('/');
    }
  };

  private authWithGoogleHandler = () => {
    const value = this.context;
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async response => {
        axios
          .post(
            'https://us-central1-florist-cb933.cloudfunctions.net/assignUserRole',
            null,
            {
              params: {
                id: response.user!.uid
              }
            }
          )
          .catch(err => console.log(err));

        const idToken = await getIdToken();
        const role = await userRole();

        value.setUserCredentials(
          response.user!.email,
          response.user!.uid,
          idToken,
          'google',
          role
        );

        this.redirectHandler('/');
      })
      .catch(error => console.log(error));
  };

  private authWithFacebookHandler = () => {
    const value = this.context;
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(async response => {
        axios.post(
          'https://us-central1-florist-cb933.cloudfunctions.net/assignUserRole',
          null,
          {
            params: {
              id: response.user!.uid
            }
          }
        );

        const idToken = await getIdToken();
        const role = await userRole();

        value.setUserCredentials(
          response.user!.displayName,
          response.user!.uid,
          idToken,
          'facebook',
          role
        );

        this.redirectHandler('/');
      })
      .catch(error => console.log(error));
  };

  public render() {
    const { email, password } = this.state.formData;
    const { mode } = this.state;
    const context = this.context;
    const lang = context.state.lang;
    const labels = context.state.labels;

    const infoPopup = (
      <Popup
        type="info"
        message={
          lang === 'en'
            ? 'Please, provide a required data'
            : 'Будь ласка, введіть дані'
        }
      />
    );
    return (
      <div className="Auth">
        <AppContext.Consumer>
          {value =>
            value && (
              <form
                onSubmit={
                  this.formSubmitHandler as
                    | ((event: React.FormEvent<HTMLFormElement>) => void)
                    | undefined
                }
              >
                {value.state.userAuthenticated === false ? (
                  <div>
                    <div className="form-field">
                      <label>{labels[lang].pages.auth.email}</label>
                      <input
                        type="email"
                        className="email-input"
                        onChange={this.emailInputChangeHandler}
                        value={email}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>{labels[lang].pages.auth.password}</label>
                      <input
                        type="password"
                        className="password-input"
                        minLength={6}
                        onChange={this.passwordInputChangeHandler}
                        value={password}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <button
                        type="submit"
                        disabled={
                          password === '' || email === '' ? true : false
                        }
                        className="submit-btn"
                      >
                        {labels[lang].pages.auth.btn}
                      </button>
                      {password === '' || email === '' ? infoPopup : null}
                    </div>
                    <hr />
                    <h3>{labels[lang].pages.auth.alternative}</h3>
                    <div className="form-field google-auth-field">
                      <p>
                        {mode === 'signup'
                          ? labels[lang].pages.auth.signup.google
                          : labels[lang].pages.auth.signin.google}
                      </p>{' '}
                      <br />
                      <a
                        onClick={this.authWithGoogleHandler}
                        className="google-auth"
                      >
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/icons%2Fgoogle.png?alt=media&token=3210d61d-cad2-45bc-a343-0ed08c097bb6"
                          alt="google-pic"
                          className="google-pic"
                        />
                      </a>
                    </div>
                    <div className="form-field facebook-auth-field">
                      <p>
                        {mode === 'signup'
                          ? labels[lang].pages.auth.signup.facebook
                          : labels[lang].pages.auth.signin.facebook}
                      </p>
                      <br />
                      <a
                        onClick={this.authWithFacebookHandler}
                        className="facebook-auth"
                      >
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/icons%2Ffacebook.png?alt=media&token=32a65be5-5336-45fd-8a50-44f8880ddbd0"
                          alt="facebook-pic"
                          className="facebook-pic"
                        />
                      </a>
                    </div>
                    <hr />
                    <div className="form-field">
                      <p>
                        {mode === 'signup'
                          ? labels[lang].pages.auth.signup.account
                          : labels[lang].pages.auth.signin.account}
                      </p>
                      <button type="button" className="switch-btn">
                        <NavLink
                          to={`/auth/${
                            mode === 'signup' ? 'signin' : 'signup'
                          }`}
                        >
                          {mode === 'signup'
                            ? labels[lang].pages.auth.signup.btn
                            : labels[lang].pages.auth.signin.btn}
                        </NavLink>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="authenticated-message">
                    {' '}
                    <h2>
                      {
                        labels[value.state.lang as string].pages.auth.isAuth
                          .main
                      }{' '}
                      <i className="far fa-flushed" />
                    </h2>{' '}
                    <span>
                      {labels[value.state.lang as string].pages.auth.isAuth.sub}
                    </span>
                  </div>
                )}
              </form>
            )
          }
        </AppContext.Consumer>
      </div>
    );
  }
}

Auth.contextType = AppContext;
export default withRouter<RouteComponentProps<MatchParams> & RCProps<{}>>(Auth);
