import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import ChangeContacts from './ChangeContacts';
import AppContextProvider from '../../../AppContext';
import labels from '../../../config/labels';
import * as updateContactsFunction from '../../../services/admin/updateContacts';
import * as createObjectPathFunction from '../../../services/admin/createObjectPath';

describe('ChangeContacts works as expected', () => {
  it('ChangeContacts component matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ChangeContacts />
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
    expect(wrapper).toMatchSnapshot();
  });
  it('FormContent displays when fetch is over', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ChangeContacts />
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
    const instance = wrapper.find('ChangeContacts').instance();
    instance.setState({
      fetchInProgress: true
    });
    expect(wrapper.find('.FormContent').exists()).toBeFalsy();
    instance.setState({
      fetchInProgress: false
    });
    wrapper.update();
    expect(wrapper.find('.FormContent').exists()).toBeTruthy();
  });
  it('updateContacts changes the state', async () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ChangeContacts />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      userLogin: 'testLogin',
      userId: 'testId',
      userToken: 'testToken',
      userRole: 'admin',
      userAuthenticated: true,
      authenticationMethod: undefined,
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute'
    });
    wrapper.update();
    const instance = wrapper.find('ChangeContacts').instance();
    const spyUpdateContacts = jest.spyOn(
      updateContactsFunction,
      'updateContacts'
    );
    instance.formSubmitHandler();
    wrapper.update();
    expect(spyUpdateContacts).toHaveBeenCalled();
  });
  it('updateContacts changes the state', async () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ChangeContacts />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      userLogin: 'testLogin',
      userId: 'testId',
      userToken: 'testToken',
      userRole: 'admin',
      userAuthenticated: true,
      authenticationMethod: undefined,
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute'
    });
    wrapper.update();
    const instance = wrapper.find('ChangeContacts').instance();
    instance.setState({
      fetchInProgress: false
    });
    wrapper.update();
    const p = Promise.resolve();
    const spyCreateObjectPath = jest
      .spyOn(createObjectPathFunction, 'createObjectPath')
      .mockImplementation(() => p);
    wrapper
      .find('.address-input')
      .simulate('change', { target: { value: 'test-brand' } });
    wrapper.update();
    await p;
    expect(spyCreateObjectPath).toHaveBeenCalled();
  });
});
