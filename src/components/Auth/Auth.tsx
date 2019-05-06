import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import {
  withRouter,
  RouteComponentProps as RCProps,
  NavLink
} from 'react-router-dom';

import Popup from '../Popup/Popup';
import { AppContext } from '../../AppContext';
import labels from '../../config/labels';
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

  private getIdToken = () => {
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

  private formSubmitHandler = (
    event: React.MouseEvent<HTMLFormElement, MouseEvent>
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
      firebase
        .auth()
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then(response => {
          (this.props as RouteComponentProps<MatchParams> &
            RCProps<{}>).history.push('/auth/signin');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({
        formData: initialFormData
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(async response => {
          const idToken = await this.getIdToken();
          value.setUserCredentials(
            response.user!.email,
            response.user!.uid,
            idToken
          );
          (this.props as RouteComponentProps<MatchParams> &
            RCProps<{}>).history.push('/');
        })
        .catch(error => console.log(error));
    }
  };

  private authWithGoogleHandler = () => {
    const value = this.context;
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async response => {
        const idToken = await this.getIdToken();
        value.setUserCredentials(
          response.user!.email,
          response.user!.uid,
          idToken,
          'google'
        );
        await axios.post(
          'https://us-central1-florist-cb933.cloudfunctions.net/giveAdminRole',
          {
            admin: true
          }
        );
        (this.props as RouteComponentProps<MatchParams> &
          RCProps<{}>).history.push('/');
      })
      .catch(error => console.log(error));
  };

  private authWithFacebookHandler = () => {
    const value = this.context;
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(async response => {
        const idToken = await this.getIdToken();
        value.setUserCredentials(
          response.user!.displayName,
          response.user!.uid,
          idToken,
          'facebook'
        );
        (this.props as RouteComponentProps<MatchParams> &
          RCProps<{}>).history.push('/');
      })
      .catch(error => console.log(error));
  };

  public render() {
    const { email, password } = this.state.formData;
    const { mode } = this.state;
    const context = this.context;

    const infoPopup = (
      <Popup
        type="info"
        message={
          context.state.lang === 'en'
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
                      <label>
                        {labels[value.state.lang as string].pages.auth.email}
                      </label>
                      <input
                        type="email"
                        className="email-input"
                        onChange={this.emailInputChangeHandler}
                        value={email}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>
                        {labels[value.state.lang as string].pages.auth.password}
                      </label>
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
                        {labels[value.state.lang as string].pages.auth.btn}
                      </button>
                      {password === '' || email === '' ? infoPopup : null}
                    </div>
                    <hr />
                    <h3>
                      {
                        labels[value.state.lang as string].pages.auth
                          .alternative
                      }
                    </h3>
                    <div className="form-field">
                      <p>
                        {mode === 'signup'
                          ? labels[value.state.lang as string].pages.auth.signup
                              .google
                          : labels[value.state.lang as string].pages.auth.signin
                              .google}
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
                    <div className="form-field">
                      <p>
                        {mode === 'signup'
                          ? labels[value.state.lang as string].pages.auth.signup
                              .facebook
                          : labels[value.state.lang as string].pages.auth.signin
                              .facebook}
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
                          ? labels[value.state.lang as string].pages.auth.signup
                              .account
                          : labels[value.state.lang as string].pages.auth.signin
                              .account}
                      </p>
                      <button type="button" className="switch-btn">
                        <NavLink
                          to={`/auth/${
                            mode === 'signup' ? 'signin' : 'signup'
                          }`}
                        >
                          {mode === 'signup'
                            ? labels[value.state.lang as string].pages.auth
                                .signup.btn
                            : labels[value.state.lang as string].pages.auth
                                .signin.btn}
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
