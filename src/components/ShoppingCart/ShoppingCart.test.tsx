import React from 'react';
import { shallow, mount } from 'enzyme';

import ShoppingCart from './ShoppingCart';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../AppContext';

it('ShoppingCartItem matches a snapshot', () => {
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
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ShoppingCart
          cartItems={[]}
          showCart={true}
          closeCart={() => {}}
          remove={() => {}}
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

it("Increasing cart item's amount changes the state", () => {
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
  const cartItem = {
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
      cartItems={[cartItem]}
      showCart={true}
      closeCart={() => {}}
      remove={() => {}}
    />
  );
  const instance = wrapper.instance();
  instance.reduceAmountClickedHandler(2, 0);
  expect(instance.state.cartProducts[0].amount).toEqual(3);
});
