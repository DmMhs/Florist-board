import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';

import ProductList from './ProductList';
import { Product } from '../../models/Product';
import ProductCard from './ProductCard/ProductCard';

it('Home page matches a snapshot', () => {
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
  expect((wrapper as any).find('.ProductList').text().length).toBeGreaterThan(
    0
  );
});
