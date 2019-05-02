import React from 'react';
import { shallow, mount } from 'enzyme';

import AppContextProvider from './AppContext';
import { BrowserRouter } from 'react-router-dom';

describe('AppContext works as expected', () => {
  it('AppContext matches a snapshot', () => {
    const wrapper = shallow(<AppContextProvider />);
    expect(wrapper).toMatchSnapshot();
  });

  it('setLangHandler changes the lang', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider />
      </BrowserRouter>
    );
    const instance = wrapper.find('AppContextProvider').instance();
    instance.setState({
      lang: 'en'
    });
    instance.setLangHandler('uk');
    expect(instance.state.lang).toEqual('uk');
  });

  it('Setting user credentails and logout change Auth context state', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider.WrappedComponent />
      </BrowserRouter>
    );
    const instance = wrapper.find('AppContextProvider').instance();
    instance.setState({
      userLogin: '',
      userId: '',
      userToken: '',
      userAuthenticated: false,
      authenticationMethod: undefined,
      lang: 'en'
    });
    instance.setUserCredentialsHandler('testLogin', 'testId', 'testToken');
    expect(instance.state).toEqual({
      userLogin: 'testLogin',
      userId: 'testId',
      userToken: 'testToken',
      userAuthenticated: true,
      authenticationMethod: undefined,
      lang: 'en'
    });
    instance.logoutHandler();
    expect(instance.state).toEqual({
      userLogin: '',
      userId: '',
      userToken: '',
      userAuthenticated: false,
      authenticationMethod: undefined,
      lang: 'en'
    });
  });

  it('Changes state if local storage auth credentials are not empty', () => {
    localStorage.floristAuthToken = 'asfasfasf';
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider.WrappedComponent />
      </BrowserRouter>
    );
    const instance = wrapper.find('AppContextProvider').instance();
    expect(instance.state.userAuthenticated).toBeTruthy();
  });
});
