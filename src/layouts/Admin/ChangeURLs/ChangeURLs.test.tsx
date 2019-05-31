import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import ChangeURLs from './ChangeURLs';
import AppContextProvider from '../../../AppContext';
import labels from '../../../config/labels';
import * as createObjectPathFunction from '../../../services/admin/createObjectPath';

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
  it('formSubmitHandler was called', () => {
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
  });
  it('changeOptionHandler was called', () => {
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
    const spyObjectPath = jest.spyOn(
      createObjectPathFunction,
      'createObjectPath'
    );
    instance.forceUpdate();
    instance.changeOptionHandler('just.a.test', {
      target: {
        value: 'just.a.test'
      }
    });
    expect(spyObjectPath).toHaveBeenCalled();
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
