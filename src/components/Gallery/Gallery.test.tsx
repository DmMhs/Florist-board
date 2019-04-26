import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import Gallery from './Gallery';
import AppContextProvider from '../../AppContext';

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
