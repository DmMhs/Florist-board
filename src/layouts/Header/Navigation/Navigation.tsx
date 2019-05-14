import React, { Component, RefObject } from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import firebase from 'firebase';

import { AppContext } from '../../../AppContext';
import { urls } from '../../../config/urls';
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
    if (value.state.mobileMode === true) {
      value.hideNavigation();
    }
  };

  private langBtnClickedHandler = () => {
    this.langOptionsRef.current!.classList.toggle('show');
    this.langOptionsToggleRef.current!.classList.toggle('active');
  };

  private langOptionClickedHandler = (option: string) => {
    const context = this.context;
    context.setLang(option);
    if (context.state.mobileMode === true) {
      context.hideNavigation();
    }
  };

  private navigationItemClickedHandler = () => {
    const context = this.context;
    if (context.state.mobileMode === true) {
      context.hideNavigation();
    }
  };

  public render() {
    const context = this.context;
    const lang = context.state.lang;
    const labels = context.state.labels;
    const labelsRoot = labels[lang as string].navigation;

    return (
      <div className="Navigation">
        <AppContext.Consumer>
          {value =>
            value && (
              <ul>
                <li onClick={this.navigationItemClickedHandler}>
                  <NavLink to="/" exact={true}>
                    {labelsRoot.home} <i className="fas fa-home" />
                  </NavLink>
                </li>
                <li onClick={this.navigationItemClickedHandler}>
                  <NavLink to="/shop">
                    {labelsRoot.shop} <i className="fas fa-leaf" />
                  </NavLink>
                </li>
                <li onClick={this.navigationItemClickedHandler}>
                  <NavLink to="/gallery">
                    {labelsRoot.gallery} <i className="far fa-image" />
                  </NavLink>
                </li>
                <li onClick={this.navigationItemClickedHandler}>
                  <NavLink to="/contacts">
                    {labelsRoot.contacts}{' '}
                    <i className="fas fa-map-marker-alt" />
                  </NavLink>
                </li>
                <li className="accountLink">
                  <a
                    className="dropbtn"
                    onClick={this.accountClickedHandler}
                    ref={this.authOptionsToggleRef}
                  >
                    {labelsRoot.account.main}{' '}
                    <i className="fas fa-user-circle" />{' '}
                    <i className="fas fa-caret-down" />
                  </a>

                  <div className="dropdown-content" ref={this.authOptionsRef}>
                    {value.state.userLogin!.length > 0 ? (
                      <p className="user-login">{value.state.userLogin}</p>
                    ) : null}

                    {value.state.userRole === 'admin' ? (
                      <div className="admin-wrapper">
                        <NavLink
                          to="/admin/add-product"
                          className="admin"
                          onClick={this.navigationItemClickedHandler}
                        >
                          <i className="fas fa-users-cog" />
                        </NavLink>
                      </div>
                    ) : null}

                    {value.state.userAuthenticated === false ? (
                      <div>
                        <NavLink
                          to="/auth/signup"
                          className="signup-link"
                          onClick={this.navigationItemClickedHandler}
                        >
                          {labelsRoot.account.menu.signUp}{' '}
                          <i className="fas fa-user-plus" />
                        </NavLink>
                        <NavLink
                          to="/auth/signin"
                          className="signin-link"
                          onClick={this.navigationItemClickedHandler}
                        >
                          {labelsRoot.account.menu.signIn}{' '}
                          <i className="fas fa-sign-in-alt" />
                        </NavLink>
                      </div>
                    ) : (
                      <a
                        onClick={this.logoutClickedHandler}
                        className="log-out"
                      >
                        {labelsRoot.account.menu.logOut}
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
                    <span>{labelsRoot.lang}</span>
                    {value.state.lang === 'en' ? (
                      <img src={urls.en_flag} />
                    ) : (
                      <img src={urls.ua_flag} />
                    )}{' '}
                    <i className="fas fa-caret-down" />
                  </a>
                  <div className="lang-options" ref={this.langOptionsRef}>
                    {value.state.lang === 'ua' ? (
                      <a
                        onClick={this.langOptionClickedHandler.bind(this, 'en')}
                      >
                        <span>{labels.en.navigation.lang}</span>{' '}
                        <img src={urls.en_flag} />
                      </a>
                    ) : (
                      <a
                        onClick={this.langOptionClickedHandler.bind(this, 'ua')}
                      >
                        <span>{labels.ua.navigation.lang}</span>
                        <img src={urls.ua_flag} />
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
