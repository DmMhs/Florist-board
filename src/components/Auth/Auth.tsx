import React, { Component } from 'react';
import firebase from 'firebase';

import './Auth.less';
import Popup from '../Popup/Popup';
import { NavLink } from 'react-router-dom';

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
  userEmail: string | null;
  userToken: string | null;
  userAuthenticated: boolean;
  mode: string;
}

class Auth extends Component<RouteComponentProps<MatchParams>, AuthState> {
  static getDerivedStateFromProps(props: any, state: AuthState) {
    return {
      mode: props.match.params.mode
    };
  }
  constructor(props: RouteComponentProps<MatchParams>) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: ''
      },
      userEmail: '',
      userToken: '',
      userAuthenticated: false,
      mode: this.props.match.params.mode
    };
  }
  componentDidMount() {
    console.log('mount');
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
  formSubmitHandler = (
    event: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    event.preventDefault();
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
      firebase
        .auth()
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then(response => {
          if (response !== undefined) {
            this.setState({
              userEmail: response.user!.email,
              formData: initialFormData,
              userAuthenticated: true
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(response => {
          console.log(response);
        })
        .catch(error => console.log(error));
    }
  };

  authWithGoogleHandler = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        if (response !== undefined) {
          const newAuthData = {
            token: (response.credential as any).idToken,
            email: response.user!.email
          };
          this.setState({
            userEmail: newAuthData.email,
            userToken: newAuthData.token,
            userAuthenticated: true
          });
          localStorage.floristAuthEmail = newAuthData.email;
          localStorage.floristAuthToken = newAuthData.token;
        }
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <div className="Auth">
        <form onSubmit={this.formSubmitHandler}>
          <div className="form-field">
            <label>Email:</label>
            <input
              type="email"
              onChange={this.emailInputChangeHandler}
              value={this.state.formData.email}
              required
            />
          </div>
          <div className="form-field">
            <label>Password:</label>
            <input
              type="password"
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
            >
              SUBMIT
            </button>
            {this.state.formData.password === '' ||
            this.state.formData.email === '' ? (
              <Popup type="info" message="Please, provide a required data" />
            ) : null}
          </div>
          <hr />
          <h3>OR</h3>
          <div className="form-field">
            <p>
              {this.state.mode === 'signup' ? 'Sign Up' : 'Sign In'} with a
              Google:
            </p>{' '}
            <br />
            <a onClick={this.authWithGoogleHandler}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/icons%2Fgoogle.png?alt=media&token=3210d61d-cad2-45bc-a343-0ed08c097bb6"
                alt="google-pic"
                className="google-pic"
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
      </div>
    );
  }
}

export default Auth;
