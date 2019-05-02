import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import Gallery from './Gallery';
import AppContextProvider from '../../AppContext';

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
    const instance = wrapper.find('Gallery').instance();

    context.setState({
      lang: 'en'
    });

    instance.setState({
      images: ['img-1', 'img-2', 'img-3', 'img-4', 'img-5'],
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
