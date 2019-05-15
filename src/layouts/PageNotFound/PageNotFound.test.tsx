import React from 'react';
import { shallow, mount } from 'enzyme';

import PageNotFound from './PageNotFound';
import AppContextProvider from '../../AppContext';
import { BrowserRouter } from 'react-router-dom';
import labels from '../../config/labels';

describe('PageNotFound works as expected', () => {
  it('PageNotFound component matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <PageNotFound />
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

  it('Message is not empty', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <PageNotFound />
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

    expect(wrapper.find('.message').text().length).toBeGreaterThan(0);
  });
});
