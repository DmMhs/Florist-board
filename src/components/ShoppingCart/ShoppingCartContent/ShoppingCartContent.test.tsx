import React from 'react';
import { shallow, mount } from 'enzyme';

import ShoppingCartContent from './ShoppingCartContent';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../../AppContext';

it('matches a snapshot', () => {
  const TestJSX = <span key={1}>jast a test</span>;
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ShoppingCartContent
          totalPrice={100}
          cartItemsList={[TestJSX, TestJSX]}
          fixEmptyCart={() => {}}
        />
      </AppContextProvider>
    </BrowserRouter>
  );
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    lang: 'en'
  });
  expect(wrapper).toMatchSnapshot();
});
