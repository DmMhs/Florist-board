import React from 'react';

import ProductsFilter from './ProductsFilter';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../../AppContext';
import { mount } from 'enzyme';

it('matches a snapshot', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ProductsFilter.WrappedComponent />
      </AppContextProvider>
    </BrowserRouter>
  );
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    lang: 'en'
  });
  expect(wrapper).toMatchSnapshot();
});
