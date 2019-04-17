import React, { Component } from 'react';
import firebase from 'firebase';
import { withRouter, RouteComponentProps as RCProps } from 'react-router-dom';

import './Auth.less';
import Popup from '../Popup/Popup';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { userInfo } from 'os';

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
  static getDerivedStateFromProps(
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

  emailInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFormData = { ...this.state.formData };
    updatedFormData.email = event.target.value;
    this.setState({
      formData: updatedFormData
    });
  };

  passwordInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFormData = { ...this.state.formData };
    updatedFormData.password = event.target.value;
    this.setState({
      formData: updatedFormData
    });
  };

  getIdToken = () => {
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

  formSubmitHandler = (
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

  authWithGoogleHandler = () => {
    const value = this.context;
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
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
  };

  authWithFacebookHandler = () => {
    const value = this.context;
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(async response => {
        const idToken = await this.getIdToken();
        value.setUserCredentials(
          response.user!.displayName,
          response.user!.uid,
          idToken
        );
        (this.props as RouteComponentProps<MatchParams> &
          RCProps<{}>).history.push('/');
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <div className="Auth">
        <AuthContext.Consumer>
          {value =>
            value && (
              <form
                onSubmit={
                  this.formSubmitHandler as
                    | ((event: React.FormEvent<HTMLFormElement>) => void)
                    | undefined
                }
              >
                <div className="form-field">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="email-input"
                    onChange={this.emailInputChangeHandler}
                    value={this.state.formData.email}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="password-input"
                    minLength={6}
                    onChange={this.passwordInputChangeHandler}
                    value={this.state.formData.password}
                    required
                  />
                </div>
                <div className="form-field">
                  <button
                    type="submit"
                    disabled={
                      this.state.formData.password === '' ||
                      this.state.formData.email === ''
                        ? true
                        : false
                    }
                    className="submit-btn"
                  >
                    SUBMIT
                  </button>
                  {this.state.formData.password === '' ||
                  this.state.formData.email === '' ? (
                    <Popup
                      type="info"
                      message="Please, provide a required data"
                    />
                  ) : null}
                </div>
                <hr />
                <h3>OR</h3>
                <div className="form-field">
                  <p>
                    {this.state.mode === 'signup' ? 'Sign Up' : 'Sign In'} with
                    a Google:
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
                    {this.state.mode === 'signup' ? 'Sign Up' : 'Sign In'} with
                    a Facebook:
                  </p>{' '}
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
                    {this.state.mode === 'signup'
                      ? 'Already have an account ?'
                      : 'Have no account ?'}
                  </p>
                  <button type="button" className="switch-btn">
                    <NavLink
                      to={`/auth/${
                        this.state.mode === 'signup' ? 'signin' : 'signup'
                      }`}
                    >
                      {this.state.mode === 'signup' ? 'SIGN IN' : 'SIGN UP'}
                    </NavLink>
                  </button>
                </div>
              </form>
            )
          }
        </AuthContext.Consumer>
      </div>
    );
  }
}

Auth.contextType = AuthContext;
export default withRouter<RouteComponentProps<MatchParams> & RCProps<{}>>(Auth);
