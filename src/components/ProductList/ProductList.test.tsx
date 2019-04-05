import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';

import ProductList from './ProductList';
import { Product } from '../../models/Product';
import ProductCard from './ProductCard/ProductCard';
import { CartItem } from '../../models/CartItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductList products={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('matches a snapshot', () => {
  const wrapper = shallow(<ProductList products={[]} />);
  expect(wrapper).toMatchSnapshot();
});

it('products list is not empty', () => {
  const prod: Product = {
    title: 'title',
    images: ['pathtoimage'],
    price: 10,
    currency: 'usd',
    available: true
  };
  const wrapper = shallow(<ProductList products={[prod, prod, prod]} />);
  expect(wrapper.find('.ProductList').exists()).toEqual(true);
  expect(wrapper.find('.ProductList').text().length).toBeGreaterThan(0);
});

it('Removes cart items', () => {
  const prod: CartItem = {
    title: 'title',
    images: ['pathtoimage'],
    price: 10,
    currency: 'usd',
    available: true,
    key: 0,
    id: 'safasf',
    inCart: false,
    amount: 1
  };
  const wrapper = shallow(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.state = {
    showCart: false,
    cartProducts: [prod, prod, prod]
  };
  instance.handleRemoveCartItem(2);
  expect(instance.state.cartProducts.length).toEqual(2);
});

it('Add to cart works', () => {
  const prod: CartItem = {
    title: 'title',
    images: ['pathtoimage'],
    price: 10,
    currency: 'usd',
    available: true,
    key: 0,
    id: 'safasf',
    inCart: false,
    amount: 1
  };
  const wrapper = shallow(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.state = {
    showCart: false,
    cartProducts: []
  };
  instance.addToCartClickedHandler(prod);
  expect(instance.state.cartProducts.length).toEqual(1);
});

it('toggleCart works', () => {
  const wrapper = mount(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.state = {
    showCart: false,
    cartProducts: []
  };
  wrapper.find('.cart-toggle').simulate('click');
  expect(instance.state.showCart).toEqual(true);
});
