import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface AuthContextState {
  userLogin: string | null | undefined;
  userId: string | null | undefined;
  userToken: string | null | undefined;
  userAuthenticated: boolean;
  authenticationMethod: string | null | undefined;
  lang: string | null | undefined;
}

export const AuthContext = React.createContext({
  state: {} as AuthContextState,
  setUserCredentials: (
    userLogin: string | null,
    userId: string | null,
    userToken: string | null,
    authenticationMethod?: string | null,
    event?: Event
  ) => {},
  logout: () => {},
  setLang: (lang: string | null) => {}
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
      userAuthenticated: false,
      authenticationMethod: undefined,
      lang: 'en'
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
        authenticationMethod: '',
        userAuthenticated: false
      });
    } else {
      this.setState({
        userLogin: localStorage.floristAuthLogin,
        userId: localStorage.floristAuthUserId,
        userToken: localStorage.floristAuthToken,
        authenticationMethod: localStorage.floristAuthMethod,
        userAuthenticated: true
      });
    }
  }
  setUserCredentialsHandler = (
    userLogin: string | null | undefined,
    userId: string | null | undefined,
    userToken: string | null | undefined,
    authenticationMethod?: string | null | undefined,
    event?: Event
  ) => {
    this.setState({
      userAuthenticated: true,
      userLogin,
      userId,
      userToken,
      authenticationMethod
    });
    localStorage.floristAuthLogin = userLogin;
    localStorage.floristAuthToken = userToken;
    localStorage.floristAuthUserId = userId;
    localStorage.floristAuthMethod = authenticationMethod;
  };
  logoutHandler = () => {
    this.setState({
      userAuthenticated: false,
      userLogin: '',
      userId: '',
      userToken: '',
      authenticationMethod: undefined
    });
    localStorage.floristAuthLogin = '';
    localStorage.floristAuthToken = '';
    localStorage.floristAuthUserId = '';
    localStorage.floristAuthMethod = '';
  };

  setLangHandler = (lang: string | null) => {
    this.setState({
      lang: lang
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          state: this.state,
          setUserCredentials: this.setUserCredentialsHandler,
          logout: this.logoutHandler,
          setLang: this.setLangHandler
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter<RouteComponentProps<{}>>(AuthContextProvider);
