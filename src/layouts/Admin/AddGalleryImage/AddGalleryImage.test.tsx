import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import AddGalleryImage from './AddGalleryImage';
import AppContextProvider from '../../../AppContext';
import labels from '../../../config/labels';
import * as uploadGalleryImageFunction from '../../../services/admin/uploadGalleryImage';
import * as getGalleryImageDownloadURLFunction from '../../../services/admin/getGalleryImageDownloadURL';

describe('AddGalleryImage works as expected', () => {
  it('AddGalleryImage component matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddGalleryImage />
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
  it('total images number is not 0', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddGalleryImage />
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
    const instance = wrapper.find('AddGalleryImage').instance();
    instance.setState({
      images: ['one', 'two', 'three']
    });
    wrapper.find('.form').simulate('submit');
    wrapper.update();
    expect(instance.state).toEqual({
      images: [],
      totalImagesNumber: 0
    });
  });
  it('total images number is not 0', async () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddGalleryImage />
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
    const instance = wrapper.find('AddGalleryImage').instance();
    instance.setState({
      images: ['one', 'two', 'three']
    });

    const p = Promise.resolve('success');
    const spyUpload = jest
      .spyOn(uploadGalleryImageFunction, 'uploadGalleryImage')
      .mockImplementation(() => p);
    const spyGetDownloadURL = jest
      .spyOn(getGalleryImageDownloadURLFunction, 'getGalleryImageDownloadURL')
      .mockImplementation(() => p);

    instance.forceUpdate();

    wrapper.find('.form').simulate('submit');
    wrapper.update();
    await p;
    expect(instance.state).toEqual({
      images: [],
      totalImagesNumber: 0
    });
    expect(spyUpload).toHaveBeenCalled();
    expect(spyGetDownloadURL).toHaveBeenCalled();
  });
});
