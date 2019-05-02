import React from 'react';
import { shallow, mount } from 'enzyme';
import firebase from 'firebase';

import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../../AppContext';
import { config } from '../../../firebase';

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
    const historyMock = { push: jest.fn() };
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider.WrappedComponent>
          <Navigation.WrappedComponent history={historyMock} />
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
      userAuthenticated: true,
      athenticationMethod: undefined,
      lang: 'en'
    });
    navigationInstance.logoutClickedHandler();
    expect(contextInstance.state).toEqual({
      userLogin: '',
      userId: '',
      userToken: '',
      userAuthenticated: false,
      athenticationMethod: undefined,
      lang: 'en'
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
    const instance = wrapper.find('Navigation').instance();

    instance.langOptionsRef.current!.className = '';
    instance.langOptionsToggleRef.current!.classList = '';

    context.setState({
      lang: 'en'
    });

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
    const instance = wrapper.find('Navigation').instance();
    context.setState({
      lang: 'en'
    });
    instance.langOptionClickedHandler('uk');
    expect(context.state.lang).toEqual('uk');
  });
});
