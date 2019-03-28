import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';

import ProductCard from './ProductCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ProductCard
      title="some"
      images={['test', 'product']}
      price={10.5}
      currency="usd"
      available={false}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('Property "available" has impact on price displaying', () => {
  let wrapper = shallow(
    <ProductCard
      title="some"
      images={['test', 'product']}
      price={10.5}
      currency="usd"
      available={false}
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
    />
  );
  expect(wrapper.find('.price').text()).toEqual('10.5usd');
});
