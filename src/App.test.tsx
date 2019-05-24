import React from 'react';
import { mount } from 'enzyme';

import Header from './components/Header/Header';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './AppContext';
import labels from './config/labels';

describe('App works as expected', () => {
  it('matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: false,
      showNavigation: true,
      togglePosition: 'absolute'
    });
    wrapper.update();
    const instance = wrapper.find('App').instance();
    expect(wrapper).toMatchSnapshot();
  });

  it('showNavigation is defined', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: false,
      showNavigation: true,
      togglePosition: 'absolute'
    });
    expect(context.state.showNavigation).toBeDefined();
  });

  it('change of showNavigation changes Header displaying', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <App />
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
    expect(wrapper.contains(<Header />)).toBeFalsy();
    context.setState({
      showNavigation: true
    });
    wrapper.update();
    expect(wrapper.contains(<Header />)).toBeTruthy();
  });

  it('reacts on toggle click', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <App />
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
    wrapper.find('.Toggle').simulate('click');
    expect(context.state.showNavigation).toBeTruthy();
    wrapper.find('.Toggle').simulate('click');
    expect(context.state.showNavigation).toBeFalsy();
  });
  it('reacts on toggle click', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <App />
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
    wrapper.find('.Toggle').simulate('click');
    expect(context.state.showNavigation).toBeTruthy();
    wrapper.find('.Toggle').simulate('click');
    expect(context.state.showNavigation).toBeFalsy();
  });
  it('changes toggles classname on resize', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <App />
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
    const instance = wrapper.find('App').instance();
    instance.toggleRef.current!.classList.add('active');
    global.innerWidth = 800;
    window.dispatchEvent(new Event('resize'));
    expect(
      instance.toggleRef.current!.classList.contains('active')
    ).toBeFalsy();
  });
  it('changes context on resize', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: false,
      showNavigation: true,
      togglePosition: 'absolute'
    });
    wrapper.update();
    const instance = wrapper.find('App').instance();
    instance.toggleRef.current!.classList.add('active');
    global.innerWidth = 600;
    window.dispatchEvent(new Event('resize'));
    expect(context.state.showNavigation).toBeFalsy();
    expect(context.state.mobileMode).toBeTruthy();
  });
  it('changes context on resize', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: false,
      showNavigation: true,
      togglePosition: 'absolute'
    });
    wrapper.update();
    const instance = wrapper.find('App').instance();
    const removeResizeListener = jest.spyOn(window, 'removeEventListener');
    instance.forceUpdate();
    wrapper.unmount();
    expect(removeResizeListener).toHaveBeenCalled();
  });
});
