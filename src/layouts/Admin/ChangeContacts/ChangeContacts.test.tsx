import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import ChangeContacts from './ChangeContacts';
import AppContextProvider from '../../../AppContext';
import labels from '../../../config/labels';
import { updateContacts } from '../../../services/admin/updateContacts';

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
  it('updateContacts changes the state', () => {
    jest.mock('../../../services/admin/updateContacts');
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
    instance.formSubmitHandler();
    instance.forceUpdate();
    const asyncCheck = setImmediate(() => {
      wrapper.update();
      expect(updateContacts).toHaveBeenCalled();
    });
    global.clearImmediate(asyncCheck);
  });
});
