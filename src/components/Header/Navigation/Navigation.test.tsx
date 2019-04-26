import React from 'react';
import { shallow, mount } from 'enzyme';
import firebase from 'firebase';

import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider, { AppContext } from '../../../AppContext';
import { config } from '../../../firebase';

it('Navigation component matches a snapshot', () => {
  const wrapper = shallow(<Navigation />);
  expect(wrapper).toMatchSnapshot();
});

it('Refs are defined', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider.WrappedComponent>
        <Navigation.WrappedComponent />
      </AppContextProvider.WrappedComponent>
    </BrowserRouter>
  );
  const contextInstance = wrapper.find('AppContextProvider').instance();
  const navigationInstance = wrapper.find('Navigation').instance();
  contextInstance.setState({
    userLogin: 'testLogin',
    userId: 'testId',
    userToken: 'testToken',
    userAuthenticated: true
  });
  navigationInstance.accountClickedHandler();
  expect(navigationInstance.authOptionsToggleRef).toBeDefined();
  expect(navigationInstance.authOptionsRef).toBeDefined();
});

it('Logs out', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider.WrappedComponent>
        <Navigation.WrappedComponent />
      </AppContextProvider.WrappedComponent>
    </BrowserRouter>
  );
  const contextInstance = wrapper.find('AppContextProvider').instance();
  const navigationInstance = wrapper.find('Navigation').instance();
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  contextInstance.setState({
    userLogin: 'testLogin',
    userId: 'testId',
    userToken: 'testToken',
    userAuthenticated: true
  });
  navigationInstance.logout();
  expect(contextInstance.state).toEqual({
    userLogin: '',
    userId: '',
    userToken: '',
    userAuthenticated: false
  });
});
