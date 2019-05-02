import React from 'react';
import { shallow, mount } from 'enzyme';
import firebase from 'firebase';

import Auth from './Auth';
import AppContextProvider, { AppContext } from '../../AppContext';
import { BrowserRouter } from 'react-router-dom';
import { config } from '../../firebase';

it('Auth component matches a snapshot', () => {
  const wrapper = shallow(<Auth />);
  expect(wrapper).toMatchSnapshot();
});

it('Submit event has impact on the state', async () => {
  let match = { params: { mode: 'signin' } };
  let wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <Auth.WrappedComponent match={match} />
      </AppContextProvider>
    </BrowserRouter>
  );
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    lang: 'en'
  });
  let instance = wrapper.find('Auth').instance();
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

  match = { params: { mode: 'signup' } };
  wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <Auth.WrappedComponent match={match} />
      </AppContextProvider>
    </BrowserRouter>
  );
  instance = wrapper.find('Auth').instance();
  instance.setState({
    formData: {
      email: 'test@mail.com',
      password: 'test_mail'
    }
  });

  wrapper.find('form').simulate('submit');
  expect(instance.state.formData.email).toEqual('');
  expect(instance.state.formData.password).toEqual('');
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
    lang: 'en'
  });
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
  const instance = wrapper.find('Auth').instance();
  const spyGoogle = jest.spyOn(instance, 'authWithGoogleHandler');
  const spyFacebook = jest.spyOn(instance, 'authWithFacebookHandler');
  instance.forceUpdate();
  wrapper.update();
  context.setState({
    lang: 'en',
    userAuthenticated: false
  });
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

  const instance = wrapper.find('Auth').instance();

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  expect(() => {
    return instance.getIdToken();
  }).toThrow();
});
