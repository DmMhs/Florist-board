import React from 'react';
import { shallow, mount } from 'enzyme';

import ContactInfo from './ContactInfo';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../../AppContext';
import { notDeepEqual } from 'assert';

it('ContactInfo component matches a snapshot', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ContactInfo address="asd" phone="asfas" />
      </AppContextProvider>
    </BrowserRouter>
  );
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    lang: 'en'
  });
  expect(wrapper).toMatchSnapshot();
});

it('Shows content conditionally', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ContactInfo address="asd" phone="asfas" instagram="asfaszvcn" />
      </AppContextProvider>
    </BrowserRouter>
  );
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    lang: 'en'
  });
  expect(wrapper.find('.address-icon').exists()).toBeTruthy();
  expect(wrapper.find('.phone-icon').exists()).toBeTruthy();
  expect(wrapper.find('.facebook-icon').exists()).toBeFalsy();
  expect(wrapper.find('.instagram-icon').exists()).toBeTruthy();
  expect(wrapper.find('.telegram-icon').exists()).toBeFalsy();
});
