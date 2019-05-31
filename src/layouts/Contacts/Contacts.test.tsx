import React from 'react';
import { shallow, mount } from 'enzyme';

import Contacts from './Contacts';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../AppContext';
import labels from '../../config/labels';
import * as getContactsFunction from '../../services/admin/getContacts';
import * as getURLsFunction from '../../services/admin/getURLs';

describe('Contacts component works as expected', () => {
  it('matches a snapshot', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Contacts />
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

  it('contacts are displayed', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Contacts />
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
    expect(wrapper.find('.Contacts').exists()).toBeTruthy();
  });
  // it('function was called', async () => {
  //   const p = Promise.resolve();
  //   const spyGetContacts = jest
  //     .spyOn(getContactsFunction, 'getContacts')
  //     .mockImplementation(() => p);

  //   const wrapper = mount(
  //     <BrowserRouter>
  //       <AppContextProvider>
  //         <Contacts />
  //       </AppContextProvider>
  //     </BrowserRouter>
  //   );
  //   const context = wrapper.find('AppContextProvider').instance();
  //   context.setState({
  //     lang: 'en',
  //     labels: labels,
  //     fetchInProgress: false,
  //     mobileMode: true,
  //     showNavigation: false,
  //     togglePosition: 'absolute'
  //   });
  //   wrapper.update();
  //   await p;

  //   expect(spyGetContacts).toHaveBeenCalled();
  // });
});
// 89.57 |    83.44 |    84.39 |    89.56
// 89.29 |    83.44 |    83.97 |    89.27
