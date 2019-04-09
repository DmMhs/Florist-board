import React from 'react';
import { shallow, mount } from 'enzyme';

import ShoppingCart from './ShoppingCart';
const cartItem = {
  title: 'qwerty',
  images: ['asd', 'qwr'],
  price: 100,
  amount: 1,
  currency: 'usd',
  available: true,
  key: 10,
  id: 'asgtqwr',
  inCart: false,
  remove: undefined
};
it('ShoppingCartItem matches a snapshot', () => {
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

it("Increasing cart item's amount changes the state", () => {
  const wrapper = shallow(
    <ShoppingCart
      cartItems={[cartItem]}
      showCart={true}
      closeCart={() => {}}
      remove={() => {}}
    />
  );
  const instance = wrapper.instance();
  instance.increaseAmountClickedHandler(0);
  expect(instance.state.cartProducts[0].amount).toEqual(2);
});

it("Reducing cart item's amount changes the state", () => {
  const cartItem2 = {
    title: 'qwerty',
    images: ['asd', 'qwr'],
    price: 100,
    amount: 4,
    currency: 'usd',
    available: true,
    key: 10,
    id: 'asgtqwr',
    inCart: false,
    remove: undefined
  };
  const wrapper = shallow(
    <ShoppingCart
      cartItems={[cartItem2]}
      showCart={true}
      closeCart={() => {}}
      remove={() => {}}
    />
  );
  const instance = wrapper.instance();
  instance.reduceAmountClickedHandler(2, 0);
  expect(instance.state.cartProducts[0].amount).toEqual(3);
});
