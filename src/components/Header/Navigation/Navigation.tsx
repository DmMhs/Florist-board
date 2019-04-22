import React, { Component, RefObject } from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import firebase from 'firebase';

import { AuthContext } from '../../Auth/AuthContext';
import labels from '../../../config/labels';
import './Navigation.less';

interface NavigationState {}

class Navigation extends Component<RouteComponentProps<{}>, NavigationState> {
  private authOptionsToggleRef: RefObject<HTMLAnchorElement>;
  private authOptionsRef: RefObject<HTMLDivElement>;

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.authOptionsRef = React.createRef();
    this.authOptionsToggleRef = React.createRef();
  }
  accountClickedHandler = () => {
    this.authOptionsToggleRef.current!.classList.toggle('active');
    this.authOptionsRef.current!.classList.toggle('show');
  };
  logout = () => {
    const value = this.context;
    firebase.auth().signOut();
    value.logout();
    if ((this.props as RouteComponentProps<{}>).history !== undefined) {
      (this.props as RouteComponentProps<{}>).history.push('/');
    }
  };
  render() {
    return (
      <div className="Navigation">
        <AuthContext.Consumer>
          {value =>
            value && (
              <ul>
                <li>
                  <NavLink to="/" exact={true}>
                    {labels.navigation.home} <i className="fas fa-home" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/shop">
                    {labels.navigation.shop} <i className="fas fa-leaf" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/gallery">
                    {labels.navigation.gallery} <i className="far fa-image" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contacts">
                    {labels.navigation.contacts}{' '}
                    <i className="fas fa-map-marker-alt" />
                  </NavLink>
                </li>
                <li className="accountLink">
                  <a
                    className="dropbtn"
                    onClick={this.accountClickedHandler}
                    ref={this.authOptionsToggleRef}
                  >
                    {labels.navigation.account.main}{' '}
                    <i className="fas fa-user-circle" />{' '}
                    <i className="fas fa-caret-down" />
                  </a>
                  <div className="dropdown-content" ref={this.authOptionsRef}>
                    {value.state.userLogin!.length > 0 ? (
                      <p className="user-login">{value.state.userLogin}</p>
                    ) : null}
                    {value.state.userAuthenticated === false ? (
                      <div>
                        <NavLink to="/auth/signup" className="signup-link">
                          Sign Up <i className="fas fa-user-plus" />
                        </NavLink>
                        <NavLink to="/auth/signin" className="signin-link">
                          Sign In <i className="fas fa-sign-in-alt" />
                        </NavLink>
                      </div>
                    ) : (
                      <a onClick={this.logout} className="log-out">
                        Log Out
                      </a>
                    )}
                  </div>
                </li>
              </ul>
            )
          }
        </AuthContext.Consumer>
      </div>
    );
  }
}

Navigation.contextType = AuthContext;
export default withRouter<RouteComponentProps<{}>>(Navigation);
