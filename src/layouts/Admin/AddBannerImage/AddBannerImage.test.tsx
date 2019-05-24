import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import AddBannerImage from './AddBannerImage';
import AppContextProvider from '../../../AppContext';
import labels from '../../../config/labels';
import * as getBannerImageDownloadURLFunction from '../../../services/admin/getBannerImageDownloadURL';
import * as uploadBannerImageFunction from '../../../services/admin/uploadBannerImage';

describe('AddBannerImage works as expected', () => {
  it('AddBannerImage component matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddBannerImage />
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
  it('submit event envokes helper functions', async () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <AddBannerImage />
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
    const instance = wrapper.find('AddBannerImage').instance();
    instance.setState({
      images: ['one']
    });

    const p = Promise.resolve('success');
    const spyUpload = jest
      .spyOn(uploadBannerImageFunction, 'uploadBannerImage')
      .mockImplementation(() => p);
    const spyGetDownloadURL = jest
      .spyOn(getBannerImageDownloadURLFunction, 'getBannerImageDownloadURL')
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
