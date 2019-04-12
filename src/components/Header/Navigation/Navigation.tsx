import React, { Component, RefObject } from 'react';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';

import labels from '../../../config/labels';
import './Navigation.less';

interface NavigationProps {
  userAuthenticated: boolean;
}
interface NavigationState {
  userAuthenticated: boolean;
}

class Navigation extends Component<NavigationProps, NavigationState> {
  private authOptionsToggleRef: RefObject<HTMLAnchorElement>;
  private authOptionsRef: RefObject<HTMLDivElement>;
  static getDerivedStateFromProps(
    props: NavigationProps,
    state: NavigationState
  ) {
    return {
      userAuthenticated: props.userAuthenticated
    };
  }
  constructor(props: NavigationProps) {
    super(props);
    this.state = {
      userAuthenticated: false
    };
    this.authOptionsRef = React.createRef();
    this.authOptionsToggleRef = React.createRef();
  }
  accountClickedHandler = () => {
    this.authOptionsToggleRef.current!.classList.toggle('active');
    this.authOptionsRef.current!.classList.toggle('show');
  };
  logoutClickedHandler = () => {
    firebase.auth().signOut();
    this.setState(
      {
        userAuthenticated: false
      },
      () => {
        localStorage.floristAuthToken = '';
        localStorage.floristAuthEmail = '';
      }
    );
  };
  render() {
    console.log(this.props.userAuthenticated);
    return (
      <div className="Navigation">
        <ul>
          <li>
            <NavLink to="/" exact>
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
              {this.state.userAuthenticated === false ? (
                <div>
                  <NavLink to="/auth/signup" className="signup-link">
                    Sign Up <i className="fas fa-user-plus" />
                  </NavLink>
                  <NavLink to="/auth/signin" className="signin-link">
                    Sign In <i className="fas fa-sign-in-alt" />
                  </NavLink>
                </div>
              ) : (
                <a onClick={this.logoutClickedHandler} className="log-out">
                  Log Out
                </a>
              )}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navigation;
