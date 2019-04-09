import React from 'react';
import { shallow } from 'enzyme';

import ShoppingCartContent from './ShoppingCartContent';

it('matches a snapshot', () => {
  const TestJSX = <span key={1}>jast a test</span>;
  const wrapper = shallow(
    <ShoppingCartContent
      totalPrice={100}
      cartItemsList={[TestJSX, TestJSX]}
      fixEmptyCart={() => {}}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
