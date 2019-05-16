import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import ChangeURLs from './ChangeURLs';
import AppContextProvider from '../../../AppContext';
import labels from '../../../config/labels';

describe('ChangeURLs works as expected', () => {
  it('ChangeURLs component matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ChangeURLs />
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
});
