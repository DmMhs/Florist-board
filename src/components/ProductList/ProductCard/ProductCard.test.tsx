import React from 'react';
import { shallow } from 'enzyme';
import {MemoryRouter} from 'react-router-dom';

import ProductCard from './ProductCard';

it('renders without crashing', () => {
  const wrapper = shallow(
    <MemoryRouter>
      <ProductCard
        title="some"
        images={['test', 'product']}
        price={10.5}
        currency="usd"
        available={false}
        key={0}
        id={'asfasf'}
        inCart={false}
      />
    </MemoryRouter>
  );
  expect(wrapper.find(ProductCard)).toMatchSnapshot()
});

it('Property "available" has impact on price displaying', () => {
  const p = {
    title: 'some',
    images: ['test', 'product'],
    price: 10.5,
    currency: 'usd',
    available: false,
    key: 0,
    id: 'asfasf',
    inCart: false,
    addToCart: () => {}
  };
  let wrapper = shallow(
    <ProductCard
      title="some"
      images={['test', 'product']}
      price={10.5}
      currency="usd"
      available={false}
      key={0}
      id={'asfasf'}
      inCart={false}
      addToCart={() => {}}
    />
  );
  expect(wrapper.find('.price').text()).toEqual('not available :(');
  wrapper = shallow(
    <ProductCard
      title="some"
      images={['test', 'product']}
      price={10.5}
      currency="usd"
      available={true}
      key={0}
      id={'asfasf'}
      inCart={false}
      addToCart={() => {}}
    />
  );
  expect(wrapper.find('.price').text()).toEqual('10.5usd');
});
