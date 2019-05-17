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
    const instance = wrapper.find('ChangeURLs').instance();
    const formSubmit = jest.spyOn(instance, 'formSubmitHandler');
    instance.forceUpdate();
    instance.formSubmitHandler();
    expect(formSubmit).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('FormContent displays when fetch is over', () => {
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
    const instance = wrapper.find('ChangeURLs').instance();
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
});
