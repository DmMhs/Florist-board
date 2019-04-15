import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

interface AuthContextState {
  userLogin: string | null | undefined;
  userId: string | null | undefined;
  userToken: string | null | undefined;
  userAuthenticated: boolean;
}

export const AuthContext = React.createContext({
  state: {} as AuthContextState,
  setUserCredentials: (
    userLogin?: string | null,
    userId?: string | null,
    event?: any
  ) => {},
  logout: () => {}
});
class AuthContextProvider extends Component<any, AuthContextState> {
  public state = {
    userLogin: '',
    userId: '',
    userToken: '',
    userAuthenticated: false
  };
  componentDidMount() {
    if (
      localStorage.floristAuthToken === '' ||
      localStorage.floristAuthToken === undefined
    ) {
      this.setState({
        userLogin: '',
        userId: '',
        userToken: '',
        userAuthenticated: false
      });
    } else {
      this.setState({
        userLogin: localStorage.floristAuthLogin,
        userId: localStorage.floristAuthUserId,
        userToken: localStorage.floristAuthToken,
        userAuthenticated: true
      });
    }
  }
  render() {
    return (
      <AuthContext.Provider
        value={{
          state: this.state,
          setUserCredentials: (
            userLogin: string | null | undefined,
            userId: string | null | undefined,
            userToken: string | null | undefined
          ) => {
            this.setState({
              userAuthenticated: true,
              userLogin,
              userId,
              userToken
            });
            localStorage.floristAuthLogin = userLogin;
            localStorage.floristAuthToken = userToken;
            localStorage.floristAuthUserId = userId;
          },
          logout: () => {
            this.setState({
              userAuthenticated: false,
              userLogin: '',
              userId: '',
              userToken: ''
            });
            localStorage.floristAuthLogin = '';
            localStorage.floristAuthToken = '';
            localStorage.floristAuthUserId = '';
          }
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(AuthContextProvider);
