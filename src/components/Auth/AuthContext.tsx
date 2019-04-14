import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

interface AuthContextState {
  userEmail: string | null | undefined;
  userAuthenticated: boolean;
}

export const AuthContext = React.createContext({
  state: {} as AuthContextState,
  setUserCredentials: (userEmail?: string | null, event?: any) => {},
  logout: () => {}
});
class AuthContextProvider extends Component<any, AuthContextState> {
  public state = {
    userEmail: '',
    userAuthenticated: false
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          state: this.state,
          setUserCredentials: (userEmail: string | null | undefined) => {
            this.setState({
              userAuthenticated: true,
              userEmail
            });
          },
          logout: () => {
            this.setState({
              userAuthenticated: false,
              userEmail: ''
            });
          }
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(AuthContextProvider);
