import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface AuthContextState {
  userLogin: string | null | undefined;
  userId: string | null | undefined;
  userToken: string | null | undefined;
  userAuthenticated: boolean;
}

export const AuthContext = React.createContext({
  state: {} as AuthContextState,
  setUserCredentials: (
    userLogin: string | null,
    userId: string | null,
    userToken: string | null,
    event?: Event
  ) => {},
  logout: () => {}
});
class AuthContextProvider extends Component<
  RouteComponentProps<{}>,
  AuthContextState
> {
  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      userLogin: '',
      userId: '',
      userToken: '',
      userAuthenticated: false
    };
  }
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
  setUserCredentialsHandler = (
    userLogin: string | null | undefined,
    userId: string | null | undefined,
    userToken: string | null | undefined,
    event?: Event
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
  };
  logoutHandler = () => {
    this.setState({
      userAuthenticated: false,
      userLogin: '',
      userId: '',
      userToken: ''
    });
    localStorage.floristAuthLogin = '';
    localStorage.floristAuthToken = '';
    localStorage.floristAuthUserId = '';
  };
  render() {
    return (
      <AuthContext.Provider
        value={{
          state: this.state,
          setUserCredentials: this.setUserCredentialsHandler,
          logout: this.logoutHandler
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter<RouteComponentProps<{}>>(AuthContextProvider);
