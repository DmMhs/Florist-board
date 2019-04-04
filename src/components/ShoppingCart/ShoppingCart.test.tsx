import React from 'react';
import { shallow } from 'enzyme';

import ShoppingCart from './ShoppingCart';

it('ShoppingCartItem matches a snapshot', () => {
  const cartItem = {
    title: 'qwerty',
    images: ['asd', 'qwr'],
    price: 100,
    currency: 'usd',
    available: true,
    key: 10,
    id: 'asgtqwr',
    inCart: false
  };
  const wrapper = shallow(
    <ShoppingCart
      cartItems={[cartItem, cartItem]}
      showCart={true}
      closeCart={() => {}}
      remove={() => {}}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
