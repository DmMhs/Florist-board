import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import Gallery from './Gallery';
import AppContextProvider from '../../AppContext';
import labels from '../../config/labels';

describe('Gallery works as expected', () => {
  it('matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Gallery.WrappedComponent />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en'
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('changes state if modal events handlers have been triggered', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Gallery.WrappedComponent />
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
    const instance = wrapper.find('Gallery').instance();
    instance.setState({
      images: [
        '%2Fimg-1.jpg',
        '%2Fimg-2.jpg',
        '%2Fimg-3.jpg',
        '%2Fimg-4.jpg',
        '%2Fimg-5.jpg'
      ],
      showModal: false,
      modalIndex: 0
    });

    instance.imageClickedHandler(2);
    expect(instance.state.showModal).toBeTruthy();
    expect(instance.state.modalIndex).toEqual(2);
    instance.nextClickedHandler();
    instance.nextClickedHandler();
    expect(instance.state.modalIndex).toEqual(4);
    instance.prevClickedHandler();
    expect(instance.state.modalIndex).toEqual(3);
    instance.closeModalClickedHandler();
    expect(instance.state.showModal).toBeFalsy();
    expect(instance.state.modalIndex).toEqual(0);
  });
});
