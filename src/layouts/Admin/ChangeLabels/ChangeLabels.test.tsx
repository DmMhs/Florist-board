import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import ChangeLabels from './ChangeLabels';
import AppContextProvider from '../../../AppContext';
import labels from '../../../config/labels';
import FormContent from './FormContent/FormContent';
import * as createObjectPathFunction from '../../../services/admin/createObjectPath';

describe('ChangeLabels works as expected', () => {
  it('ChangeLabels component matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ChangeLabels />
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
  it('formSubmitHandler is called on form submition', async () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ChangeLabels />
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
    const instance = wrapper.find('ChangeLabels').instance();
    const formSubmit = jest.spyOn(instance, 'formSubmitHandler');
    instance.forceUpdate();
    instance.formSubmitHandler();
    expect(formSubmit).toHaveBeenCalled();
  });
  it('formSubmitHandler is called on form submition', async () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ChangeLabels />
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
    const instance = wrapper.find('ChangeLabels').instance();
    const formSubmit = jest.spyOn(instance, 'formSubmitHandler');
    instance.forceUpdate();
    instance.formSubmitHandler();
    expect(formSubmit).toHaveBeenCalled();
  });
  it('FormContent displays when fetch is over', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ChangeLabels />
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
    const instance = wrapper.find('ChangeLabels').instance();
    instance.setState({
      fetchedLabels: labels,
      fetchInProgress: true
    });
    expect(
      wrapper.contains(
        <FormContent
          lang="en"
          labels={instance.state.fetchedLabels}
          changeOption={() => {}}
        />
      )
    ).toBeFalsy();
    instance.setState({
      fetchInProgress: false
    });
    wrapper.update();
    expect(wrapper.find('.FormContent').exists()).toBeTruthy();
  });
  it('changeOptionHandler was called', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ChangeLabels />
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
    const instance = wrapper.find('ChangeLabels').instance();
    instance.setState({
      newLabels: labels,
      fetchInProgress: true
    });
    const spyObjectPath = jest.spyOn(
      createObjectPathFunction,
      'createObjectPath'
    );
    instance.forceUpdate();
    instance.changeOptionHandler('pages.admin.title', 'en', {
      target: {
        value: 'newvalue'
      }
    });
    expect(spyObjectPath).toHaveBeenCalled();
  });
});
