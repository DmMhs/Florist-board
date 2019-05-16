import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import Admin from './Admin';
import AppContextProvider from '../../AppContext';
import labels from '../../config/labels';

describe('Admin works as expected', () => {
  it('Admin component matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Admin />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      userLogin: 'testLogin',
      userId: 'testId',
      userToken: 'testToken',
      userRole: 'admin',
      userAuthenticated: false,
      authenticationMethod: undefined,
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
  // it('mode switching changes the state', () => {
  //   // const match = { params: { mode: 'add-product' } };
  //   const wrapper = mount(
  //     <BrowserRouter>
  //       <AppContextProvider>
  //         <Admin />
  //       </AppContextProvider>
  //     </BrowserRouter>
  //   );
  //   const context = wrapper.find('AppContextProvider').instance();
  //   context.setState({
  //     userLogin: 'testLogin',
  //     userId: 'testId',
  //     userToken: 'testToken',
  //     userRole: 'admin',
  //     userAuthenticated: true,
  //     authenticationMethod: undefined,
  //     lang: 'en',
  //     labels: labels,
  //     fetchInProgress: false,
  //     mobileMode: true,
  //     showNavigation: false,
  //     togglePosition: 'absolute'
  //   });
  //   wrapper.update();
  //   const instance = wrapper.find('Admin').instance();
  //   console.log(instance.state);
  //   wrapper.find('.configurateGallery').simulate('click');
  //   console.log(instance.state);
  //   expect(instance.state.mode).toEqual('configurate-gallery');
  //   wrapper.find('.configurateURLs').simulate('click');
  //   expect(instance.state.mode).toEqual('configurate-urls');
  //   wrapper.find('.configurateContacts').simulate('click');
  //   expect(instance.state.mode).toEqual('configurate-contacts');
  //   wrapper.find('.configurateLabels').simulate('click');
  //   expect(instance.state.mode).toEqual('configurate-labels');
  // });
});
