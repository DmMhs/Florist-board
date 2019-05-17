import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import Admin from './Admin';
import AppContextProvider from '../../AppContext';
import labels from '../../config/labels';
import { createMemoryHistory } from 'history';

describe('Admin works as expected', () => {
  it('Admin component matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Admin />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      userLogin: 'testLogin',
      userId: 'testId',
      userToken: 'testToken',
      userRole: 'admin',
      userAuthenticated: false,
      authenticationMethod: undefined,
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
  it('mode switching changes the state', () => {
    const match = { params: { mode: 'add-product' } };
    const historyMock = { replace: jest.fn() };
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Admin.WrappedComponent match={match} history={historyMock} />
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
      labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute'
    });
    wrapper.update();
    wrapper.find('.configurateGallery').simulate('click');
    expect(historyMock.replace.mock.calls[0]).toEqual(['configurate-gallery']);
  });
});
