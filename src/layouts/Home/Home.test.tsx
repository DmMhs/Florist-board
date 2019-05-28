import React from 'react';
import { shallow, mount } from 'enzyme';

import { homeImagesRef } from '../../firebase';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../AppContext';
import labels from '../../config/labels';

describe('Home works as expected', () => {
  it('Home component matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Home />
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

  it('has a valid state value', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Home />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      fetchInProgress: false,
      mobileMode: false
    });
    wrapper.update();
    const instance = wrapper.instance();
    instance.setState({
      bannerImages: ['zero', 'one', 'two']
    });

    expect(instance.state.bannerImages.length).toEqual(3);
  });

  it('banner images do fetch', async () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Home />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      fetchInProgress: false,
      mobileMode: false
    });
    wrapper.update();
    const instance = wrapper.instance();

    await homeImagesRef.once('value').then(snapshot => {
      instance.setState({
        isFetching: true
      });
      const newImages: string[] = [];
      snapshot!.forEach(imgRef => {
        newImages.push(imgRef.val());
      });
      instance.setState({
        bannerImages: newImages,
        isFetching: false
      });
    });
    expect(instance.state.bannerImages.length).toBeGreaterThan(0);
  });
});
