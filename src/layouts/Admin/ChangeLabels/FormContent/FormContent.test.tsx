import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import FormContent from './FormContent';
import AppContextProvider from '../../../../AppContext';
import labels from '../../../../config/labels';

describe('FormContent works as expected', () => {
  it('FormContent component matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <FormContent labels={labels} lang="en" changeOption={() => {}} />
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
