import React, { Component } from 'react';

import './Auth.less';
import Popup from '../Popup/Popup';
import * as authService from '../../services/auth';

type authModes = 'signup' | 'signin';
interface AuthProps {}
interface AuthState {
  formData: {
    email: string;
    password: string;
  };
  mode: authModes;
}

class Auth extends Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: ''
      },
      mode: 'signup'
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
  formSubmitHandler = (
    event: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (this.state.mode === 'signup') {
      authService.signUp(
        this.state.formData.email,
        this.state.formData.password
      );
    } else {
      authService.signIn(
        this.state.formData.email,
        this.state.formData.password
      );
    }
  };
  switchAuthModeClickedHandler = () => {
    this.setState({ mode: this.state.mode === 'signup' ? 'signin' : 'signup' });
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
              required
            />
          </div>
          <div className="form-field">
            <label>Password:</label>
            <input
              type="password"
              minLength={6}
              onChange={this.passwordInputChangeHandler}
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
            <a href="#">
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
            <button
              type="button"
              className="switch-btn"
              onClick={this.switchAuthModeClickedHandler}
            >
              {this.state.mode === 'signup' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
