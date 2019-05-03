import React, { Component, RefObject } from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import firebase from 'firebase';

import { AppContext } from '../../../AppContext';
import labels from '../../../config/labels';
import './Navigation.less';

interface NavigationState {}

class Navigation extends Component<RouteComponentProps<{}>, NavigationState> {
  private authOptionsToggleRef: RefObject<HTMLAnchorElement>;
  private authOptionsRef: RefObject<HTMLDivElement>;
  private langOptionsRef: RefObject<HTMLDivElement>;
  private langOptionsToggleRef: RefObject<HTMLAnchorElement>;

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.authOptionsRef = React.createRef();
    this.authOptionsToggleRef = React.createRef();
    this.langOptionsRef = React.createRef();
    this.langOptionsToggleRef = React.createRef();
  }

  private accountClickedHandler = () => {
    this.authOptionsToggleRef.current!.classList.toggle('active');
    this.authOptionsRef.current!.classList.toggle('show');
  };

  private logoutClickedHandler = () => {
    const value = this.context;
    firebase.auth().signOut();
    value.logout();
    if ((this.props as RouteComponentProps<{}>).history !== undefined) {
      (this.props as RouteComponentProps<{}>).history.push('/');
    }
  };

  private langBtnClickedHandler = () => {
    this.langOptionsRef.current!.classList.toggle('show');
    this.langOptionsToggleRef.current!.classList.toggle('active');
  };
  private langOptionClickedHandler = (option: string) => {
    const context = this.context;
    context.setLang(option);
  };
  public render() {
    return (
      <div className="Navigation">
        <AppContext.Consumer>
          {value =>
            value && (
              <ul>
                <li>
                  <NavLink to="/" exact={true}>
                    {labels[value.state.lang as string].navigation.home}{' '}
                    <i className="fas fa-home" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/shop">
                    {labels[value.state.lang as string].navigation.shop}{' '}
                    <i className="fas fa-leaf" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/gallery">
                    {labels[value.state.lang as string].navigation.gallery}{' '}
                    <i className="far fa-image" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contacts">
                    {labels[value.state.lang as string].navigation.contacts}{' '}
                    <i className="fas fa-map-marker-alt" />
                  </NavLink>
                </li>
                <li className="accountLink">
                  <a
                    className="dropbtn"
                    onClick={this.accountClickedHandler}
                    ref={this.authOptionsToggleRef}
                  >
                    {labels[value.state.lang as string].navigation.account.main}{' '}
                    <i className="fas fa-user-circle" />{' '}
                    <i className="fas fa-caret-down" />
                  </a>
                  <div className="dropdown-content" ref={this.authOptionsRef}>
                    {value.state.userLogin!.length > 0 ? (
                      <p className="user-login">{value.state.userLogin}</p>
                    ) : null}
                    <NavLink to="/admin">
                      <i className="fas fa-users-cog" />
                    </NavLink>
                    {value.state.userAuthenticated === false ? (
                      <div>
                        <NavLink to="/auth/signup" className="signup-link">
                          {
                            labels[value.state.lang as string].navigation
                              .account.menu.signUp
                          }{' '}
                          <i className="fas fa-user-plus" />
                        </NavLink>
                        <NavLink to="/auth/signin" className="signin-link">
                          {
                            labels[value.state.lang as string].navigation
                              .account.menu.signIn
                          }{' '}
                          <i className="fas fa-sign-in-alt" />
                        </NavLink>
                      </div>
                    ) : (
                      <a
                        onClick={this.logoutClickedHandler}
                        className="log-out"
                      >
                        {
                          labels[value.state.lang as string].navigation.account
                            .menu.logOut
                        }
                      </a>
                    )}
                  </div>
                </li>
                <li className="langLink">
                  <a
                    className="lang-btn"
                    onClick={this.langBtnClickedHandler}
                    ref={this.langOptionsToggleRef}
                  >
                    <span>
                      {labels[value.state.lang as string].navigation.lang}
                    </span>
                    {value.state.lang === 'en' ? (
                      <img src="https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/icons%2Flang%2Funited-kingdom.png?alt=media&token=791aa1e1-7dc6-467f-a716-3eb8dce0b313" />
                    ) : (
                      <img src="https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/icons%2Flang%2Fukraine.png?alt=media&token=9305aa3b-0e62-411e-b6ae-7dbbcaa72e74" />
                    )}{' '}
                    <i className="fas fa-caret-down" />
                  </a>
                  <div className="lang-options" ref={this.langOptionsRef}>
                    {value.state.lang === 'uk' ? (
                      <a
                        onClick={this.langOptionClickedHandler.bind(this, 'en')}
                      >
                        <span>{labels.en.navigation.lang}</span>{' '}
                        <img src="https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/icons%2Flang%2Funited-kingdom.png?alt=media&token=791aa1e1-7dc6-467f-a716-3eb8dce0b313" />
                      </a>
                    ) : (
                      <a
                        onClick={this.langOptionClickedHandler.bind(this, 'uk')}
                      >
                        <span>{labels.uk.navigation.lang}</span>
                        <img src="https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/icons%2Flang%2Fukraine.png?alt=media&token=9305aa3b-0e62-411e-b6ae-7dbbcaa72e74" />
                      </a>
                    )}
                  </div>
                </li>
              </ul>
            )
          }
        </AppContext.Consumer>
      </div>
    );
  }
}

Navigation.contextType = AppContext;
export default withRouter<RouteComponentProps<{}>>(Navigation);
