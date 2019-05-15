import React from 'react';
import { shallow, mount } from 'enzyme';
import firebase from 'firebase';

import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../../AppContext';
import { config } from '../../../firebase';
import labels from '../../../config/labels';

describe('Navigation works as expected', () => {
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
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute'
    });
    wrapper.update();
    const navigationInstance = wrapper.find('Navigation').instance();
    navigationInstance.accountClickedHandler();
    expect(navigationInstance.authOptionsToggleRef).toBeDefined();
    expect(navigationInstance.authOptionsRef).toBeDefined();
  });

  it('Logs out', () => {
    const historyMock = { push: jest.fn() };
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider.WrappedComponent>
          <Navigation.WrappedComponent history={historyMock} />
        </AppContextProvider.WrappedComponent>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      userLogin: 'testLogin',
      userId: 'testId',
      userToken: 'testToken',
      userRole: 'user',
      userAuthenticated: true,
      athenticationMethod: undefined,
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute'
    });
    wrapper.update();
    const navigationInstance = wrapper.find('Navigation').instance();
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    navigationInstance.logoutClickedHandler();
    expect(context.state).toEqual({
      userLogin: '',
      userId: '',
      userToken: '',
      userRole: '',
      userAuthenticated: false,
      athenticationMethod: undefined,
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute'
    });
    expect(historyMock.push.mock.calls[0]).toEqual(['/']);
  });

  it('langBtnClickedHandler toggles the refs classes', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider.WrappedComponent>
          <Navigation.WrappedComponent />
        </AppContextProvider.WrappedComponent>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute'
    });
    wrapper.update();
    const instance = wrapper.find('Navigation').instance();

    instance.langOptionsRef.current!.className = '';
    instance.langOptionsToggleRef.current!.classList = '';

    instance.langBtnClickedHandler();
    expect(instance.langOptionsRef.current!.className).toEqual('show');
    expect(instance.langOptionsToggleRef.current!.className).toEqual('active');
  });

  it('langOptionClickedHandler changes the context', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider.WrappedComponent>
          <Navigation.WrappedComponent />
        </AppContextProvider.WrappedComponent>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute'
    });
    wrapper.update();
    const instance = wrapper.find('Navigation').instance();

    instance.langOptionClickedHandler('ua');
    expect(context.state.lang).toEqual('ua');
  });
});
