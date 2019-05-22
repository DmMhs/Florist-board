import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import AddProduct from './AddProduct';
import AppContextProvider from '../../../AppContext';
import labels from '../../../config/labels';
import * as deleteProductImagesFunction from '../../../services/admin/deleteProductImages';
import * as deleteProductImagesFromDBFunction from '../../../services/admin/deleteProductImagesFromDB';
import * as updateProductImagesURLsFunction from '../../../services/admin/updateProductImagesURLs';

describe('AddProduct works as expected', () => {
  it('AddProduct component matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddProduct />
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

  it('descriptionChangedHandler & descriptionUAChangedHandler change the state', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddProduct />
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
    const instance = wrapper.find('AddProduct').instance();
    wrapper.find('.descriptionText').simulate('change', {
      target: { value: 'test descriptionChangedHandler' }
    });
    wrapper.find('.descriptionUAText').simulate('change', {
      target: { value: 'test descriptionUAChangedHandler' }
    });
    expect(instance.state.description).toEqual(
      'test descriptionChangedHandler'
    );
    expect(instance.state.description_ua).toEqual(
      'test descriptionUAChangedHandler'
    );
  });
  it('currencyChangedHandler changes the state', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddProduct />
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
    const instance = wrapper.find('AddProduct').instance();
    wrapper.find('.currencySelect').simulate('change', {
      target: { value: 'UAH' }
    });
    expect(instance.state.currency).toEqual('UAH');
  });
  it('priceInputChangedHandler changes the state', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddProduct />
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
    const instance = wrapper.find('AddProduct').instance();
    wrapper.find('.priceInput').simulate('change', {
      target: { value: 200 }
    });
    expect(instance.state.price).toEqual(200);
  });
  it('imgInputChangedHandler changes the state', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddProduct />
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
    const file = 'dummy.image';
    wrapper.update();
    const instance = wrapper.find('AddProduct').instance();
    wrapper
      .find('.fileInput')
      .at(0)
      .simulate('change', {
        target: { files: file }
      });
    expect(instance.state.images).toEqual(['dummy.image']);
  });
  it('titleInputChangedHandler & titleUAInputChangedHandler change the state', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddProduct />
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
    const instance = wrapper.find('AddProduct').instance();
    wrapper.find('.titleInput').simulate('change', {
      target: { value: 'test titleInputChangedHandler' }
    });
    wrapper.find('.titleUAInput').simulate('change', {
      target: { value: 'test titleUAInputChangedHandler' }
    });
    expect(instance.state.title).toEqual('test titleInputChangedHandler');
    expect(instance.state.title_ua).toEqual('test titleUAInputChangedHandler');
  });
  it('availableChangedHandler changes the state', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddProduct />
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
    const instance = wrapper.find('AddProduct').instance();
    wrapper.find('.availableSelect').simulate('change', {
      target: { value: 'true' }
    });
    expect(instance.state.available).toEqual(true);
  });
  it('formSubmitHandler changes the state', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddProduct />
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
    const instance = wrapper.find('AddProduct').instance();
    instance.setState({
      available: true,
      title: 'test',
      title_ua: 'test',
      images: [],
      price: 30,
      currency: 'usd',
      description: 'test',
      description_ua: 'test'
    });
    wrapper.find('.form').simulate('submit');
    const asyncCheck = setImmediate(() => {
      wrapper.update();
      expect(instance.state).toEqual({
        available: true,
        title: '',
        title_ua: '',
        images: [],
        price: 0,
        currency: 'usd',
        description: '',
        description_ua: ''
      });
    });
    global.clearImmediate(asyncCheck);
  });
  it('editModeEnabled and submit envokes helper functions', async () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddProduct editModeEnabled={true} />
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
    const instance = wrapper.find('AddProduct').instance();

    const p = Promise.resolve();

    const spyDeleteImages = jest
      .spyOn(deleteProductImagesFunction, 'deleteProductImages')
      .mockImplementation((id: string, folderName: string) => p);
    const spyDeleteImagesFromDB = jest
      .spyOn(deleteProductImagesFromDBFunction, 'deleteProductImagesFromDB')
      .mockImplementation((id: string) => p);
    // const spyUpdateImageURL = jest
    //   .spyOn(updateProductImagesURLsFunction, 'updateProductImagesURLs')
    //   .mockImplementation(() => p);
    instance.forceUpdate();
    wrapper.find('.form').simulate('submit');
    wrapper.update();
    await p;
    expect(spyDeleteImages).toHaveBeenCalled();
    expect(spyDeleteImagesFromDB).toHaveBeenCalled();
    // expect(spyUpdateImageURL).toHaveBeenCalled();
  });
});
