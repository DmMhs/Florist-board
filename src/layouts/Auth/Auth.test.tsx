import React from 'react';
import { shallow, mount } from 'enzyme';
import firebase from 'firebase';

import Auth from './Auth';
import AppContextProvider from '../../AppContext';
import { BrowserRouter } from 'react-router-dom';
import { config } from '../../firebase';
import labels from '../../config/labels';
import * as createUserWithEmailAndPasswordFunction from '../../services/auth/createUserWithEmailAndPassword';
import * as signInWithEmailAndPasswordFunction from '../../services/auth/signInWithEmailAndPassword';

describe('Auth works as expected', () => {
  it('Auth component matches a snapshot', () => {
    const wrapper = shallow(<Auth />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Submit event has impact on the state', async () => {
    const match = { params: { mode: 'signin' } };
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Auth.WrappedComponent match={match} />
        </AppContextProvider>
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
    const instance = wrapper.find('Auth').instance();
    instance.setState({
      formData: {
        email: 'bob_awesome@mail.com',
        password: 'bob_awesome'
      }
    });

    expect(instance.state.mode).toEqual('signin');
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    wrapper.find('form').simulate('submit');

    expect(instance.state.formData.email).toEqual('');
    expect(instance.state.formData.password).toEqual('');

    const match2 = { params: { mode: 'signup' } };
    const wrapper2 = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Auth.WrappedComponent match={match2} />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context2 = wrapper2.find('AppContextProvider').instance();
    context2.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute'
    });
    wrapper2.update();
    const instance2 = wrapper2.find('Auth').instance();
    instance2.setState({
      formData: {
        email: 'test@mail.com',
        password: 'test_mail'
      }
    });

    wrapper2.find('form').simulate('submit');
    expect(instance2.state.formData.email).toEqual('');
    expect(instance2.state.formData.password).toEqual('');
  });

  it('Email and password inputs change the state', () => {
    const match = { params: { mode: 'signin' } };
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Auth.WrappedComponent match={match} />
        </AppContextProvider>
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
    const instance = wrapper.find('Auth').instance();
    instance.setState({
      formData: {
        email: '',
        password: ''
      }
    });
    wrapper
      .find('.email-input')
      .simulate('change', { target: { value: 'Test email' } });
    wrapper
      .find('.password-input')
      .simulate('change', { target: { value: 'Test password' } });

    expect(instance.state.formData.email).toEqual('Test email');
    expect(instance.state.formData.password).toEqual('Test password');
  });

  it('Google and Facebook authorization clicking envokes handlers', () => {
    const match = { params: { mode: 'signin' } };
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Auth.WrappedComponent match={match} />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute',
      userAuthenticated: false
    });
    wrapper.update();
    const instance = wrapper.find('Auth').instance();
    const spyGoogle = jest.spyOn(instance, 'authWithGoogleHandler');
    const spyFacebook = jest.spyOn(instance, 'authWithFacebookHandler');
    instance.forceUpdate();
    wrapper.update();
    instance.setState({
      formData: {
        email: 'bob_awesome@mail.com',
        password: 'bob_awesome'
      },
      mode: 'signin'
    });
    wrapper.update();
    wrapper.find('.google-auth').simulate('click');
    expect(spyGoogle).toHaveBeenCalled();
    wrapper.find('.facebook-auth').simulate('click');
    expect(spyFacebook).toHaveBeenCalled();
  });
  it('getIdToken throws error for not authenticated user', async () => {
    const match = { params: { mode: 'signin' } };
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Auth.WrappedComponent match={match} />
        </AppContextProvider>
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

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    expect(() => {
      return context.getIdToken();
    }).toThrow();
  });
  it('Email with password signing up envokes handlers', async () => {
    const match = { params: { mode: 'signup' } };
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Auth.WrappedComponent match={match} />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute',
      userAuthenticated: false
    });
    wrapper.update();
    const instance = wrapper.find('Auth').instance();
    instance.forceUpdate();
    instance.setState({
      formData: {
        email: 'new_account@mail.com',
        password: 'new_account'
      },
      mode: 'signup'
    });

    const p = Promise.resolve();

    const spyCreateUser = jest
      .spyOn(
        createUserWithEmailAndPasswordFunction,
        'createUserWithEmailAndPassword'
      )
      .mockImplementation((email: string, password: string) => p);
    const spyRedirect = jest
      .spyOn(instance, 'redirectHandler')
      .mockImplementation(() => p);
    instance.forceUpdate();
    wrapper.find('form').simulate('submit');
    await p;
    expect(spyCreateUser).toHaveBeenCalled();
    expect(spyRedirect).toHaveBeenCalled();
  });
  it('signing in with email and password envokes helper functions', async () => {
    const match = { params: { mode: 'signin' } };
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Auth.WrappedComponent match={match} />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute',
      userAuthenticated: false
    });
    wrapper.update();
    const instance = wrapper.find('Auth').instance();
    instance.forceUpdate();
    instance.setState({
      formData: {
        email: 'new_account@mail.com',
        password: 'new_account'
      },
      mode: 'signin'
    });
    instance.forceUpdate();
    const p = Promise.resolve();

    const spySignIn = jest
      .spyOn(signInWithEmailAndPasswordFunction, 'signInWithEmailAndPassword')
      .mockImplementation(() => p);
    // const spyRedirect = jest
    //   .spyOn(instance, 'redirectHandler')
    //   .mockImplementation(() => p);
    instance.forceUpdate();
    wrapper.find('form').simulate('submit');
    await p;
    expect(spySignIn).toHaveBeenCalled();
    // expect(spyRedirect).toHaveBeenCalled();
  });
});
