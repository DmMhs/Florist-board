import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import ChangeBanner from './ChangeBanner';
import AppContextProvider, { AppContext } from '../../../AppContext';
import labels from '../../../config/labels';
import * as getBannerImageDownloadURLFunction from '../../../services/admin/getBannerImageDownloadURL';
import * as uploadBannerImageFunction from '../../../services/admin/uploadBannerImage';
import * as setDesktopBannerParamsFunction from '../../../services/admin/setDesktopBannerParams';

describe('ChangeBanner works as expected', () => {
  it('ChangeBanner component matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ChangeBanner />
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
          <ChangeBanner />
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
    const instance = wrapper.find('ChangeBanner').instance();
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

    wrapper.find('.AddGalleryImage').simulate('submit');
    wrapper.update();
    await p;
    expect(instance.state).toEqual({
      images: [],
      totalImagesNumber: 0,
      desktopBannerWrapperHeight: '',
      desktopBannerWrapperWidth: '',
      bannerWidthUnits: '%',
      bannerHeightUnits: 'px'
    });
    expect(spyUpload).toHaveBeenCalled();
    expect(spyGetDownloadURL).toHaveBeenCalled();
  });

  it('Changing banner parameters envokes helper functions', async () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ChangeBanner />
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
    const instance = wrapper.find('ChangeBanner').instance();
    instance.setState({
      images: ['one']
    });

    const p = Promise.resolve('success');
    const spySetParams = jest
      .spyOn(setDesktopBannerParamsFunction, 'setDesktopBannerParams')
      .mockImplementation(() => p);
    instance.forceUpdate();

    wrapper.find('.ChangeDesktopBanner').simulate('submit');
    wrapper.update();
    await p;
    expect(spySetParams).toHaveBeenCalled();
  });
  it('Event handlers change the state', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ChangeBanner />
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
    const instance = wrapper.find('ChangeBanner').instance();
    instance.setState({
      images: ['one']
    });
    instance.forceUpdate();
    wrapper.find('.widthInput').simulate('change', { target: { value: '10' } });
    wrapper
      .find('.widthSelect')
      .simulate('change', { target: { value: 'px' } });
    wrapper
      .find('.heightInput')
      .simulate('change', { target: { value: '30' } });
    wrapper
      .find('.heightSelect')
      .simulate('change', { target: { value: '%' } });
    wrapper.update();
    expect(instance.state).toEqual({
      images: ['one'],
      totalImagesNumber: 0,
      desktopBannerWrapperHeight: '30',
      desktopBannerWrapperWidth: '10',
      bannerWidthUnits: 'px',
      bannerHeightUnits: '%'
    });
  });
});
