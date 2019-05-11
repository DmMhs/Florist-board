import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { database } from './firebase';
import { Labels } from './models/Labels';
import Spinner from './components/Spinner/Spinner';

export interface AppContextState {
  userLogin: string | null | undefined;
  userId: string | null | undefined;
  userToken: string | null | undefined;
  userRole: string | null | undefined;
  userAuthenticated: boolean;
  authenticationMethod: string | null | undefined;
  lang: string | null | undefined;
  labels: Labels;
  fetchInProgress: boolean;
}

export const AppContext = React.createContext({
  state: {} as AppContextState,
  setUserCredentials: (
    userLogin: string | null,
    userId: string | null,
    userToken: string | null,
    authenticationMethod?: string | null,
    userRole?: string | null,
    event?: Event
  ) => {},
  logout: () => {},
  setLang: (lang: string | null) => {}
});
class AppContextProvider extends Component<
  RouteComponentProps<{}>,
  AppContextState
> {
  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      userLogin: '',
      userId: '',
      userToken: '',
      userRole: '',
      userAuthenticated: false,
      authenticationMethod: undefined,
      lang: 'en',
      labels: {},
      fetchInProgress: true
    };
  }
  public componentDidMount() {
    database.ref().child('labels').on('value', snapshot => {
      this.setState({
        labels: snapshot!.val(),
        fetchInProgress: false
      });
    });
    if (
      localStorage.floristAuthToken === '' ||
      localStorage.floristAuthToken === undefined
    ) {
      this.setState({
        userLogin: '',
        userId: '',
        userToken: '',
        userRole: '',
        authenticationMethod: '',
        userAuthenticated: false
      });
    } else {
      this.setState({
        userLogin: localStorage.floristAuthLogin,
        userId: localStorage.floristAuthUserId,
        userToken: localStorage.floristAuthToken,
        userRole: localStorage.floristUserRole,
        authenticationMethod: localStorage.floristAuthMethod,
        userAuthenticated: true
      });
    }
  }

  private setUserCredentialsHandler = (
    userLogin: string | null | undefined,
    userId: string | null | undefined,
    userToken: string | null | undefined,
    authenticationMethod?: string | null | undefined,
    userRole?: string | null | undefined,
    event?: Event
  ) => {
    this.setState({
      userAuthenticated: true,
      userLogin,
      userId,
      userToken,
      authenticationMethod,
      userRole
    });
    localStorage.floristAuthLogin = userLogin;
    localStorage.floristAuthToken = userToken;
    localStorage.floristAuthUserId = userId;
    localStorage.floristAuthMethod = authenticationMethod;
    localStorage.floristUserRole = userRole;
  };
  private logoutHandler = () => {
    this.setState({
      userAuthenticated: false,
      userLogin: '',
      userId: '',
      userToken: '',
      userRole: '',
      authenticationMethod: undefined
    });
    localStorage.floristAuthLogin = '';
    localStorage.floristAuthToken = '';
    localStorage.floristAuthUserId = '';
    localStorage.floristAuthMethod = '';
    localStorage.floristUserRole = '';
  };

  private setLangHandler = (lang: string | null) => {
    this.setState({
      lang
    });
  };

  public render() {
    console.log(this.state.labels);
    return (
      this.state.fetchInProgress === true ? <Spinner /> :
      <AppContext.Provider
        value={{
          state: this.state,
          setUserCredentials: this.setUserCredentialsHandler,
          logout: this.logoutHandler,
          setLang: this.setLangHandler
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default withRouter<RouteComponentProps<{}>>(AppContextProvider);
