import React from 'react';
import { shallow, mount } from 'enzyme';

import Contacts from './Contacts';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../AppContext';
import labels from '../../config/labels';

describe('Contacts component works as expected', () => {
  it('matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Contacts />
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

  it('contacts are displayed', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Contacts />
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
    expect(wrapper.find('.Contacts').exists()).toBeTruthy();
  });
});
