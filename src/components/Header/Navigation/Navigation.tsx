import React, { Component, RefObject } from 'react';
import { NavLink } from 'react-router-dom';

import labels from '../../../config/labels';
import './Navigation.less';

interface NavigationProps {}
interface NavigationState {}

class Navigation extends Component<NavigationProps, NavigationState> {
  private authOptionsToggleRef: RefObject<HTMLAnchorElement>;
  private authOptionsRef: RefObject<HTMLDivElement>;
  constructor(props: NavigationProps) {
    super(props);
    this.authOptionsRef = React.createRef();
    this.authOptionsToggleRef = React.createRef();
  }
  accountClickedHandler = () => {
    this.authOptionsToggleRef.current!.classList.toggle('active');
    this.authOptionsRef.current!.classList.toggle('show');
  };
  render() {
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
              <NavLink to="/auth/signup">
                Sign Up <i className="fas fa-user-plus" />
              </NavLink>
              <NavLink to="/auth/signin">
                Sign In <i className="fas fa-sign-in-alt" />
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navigation;
