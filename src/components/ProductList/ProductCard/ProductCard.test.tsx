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
      key={0}
      id={'asfasf'}
      inCart={false}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
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
      addToCart={() =>
        (wrapper.instance() as any).addToCartClickedHandler(p, event as any)
      }
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
      addToCart={() =>
        (wrapper.instance() as any).addToCartClickedHandler(p, event as any)
      }
    />
  );
  expect(wrapper.find('.price').text()).toEqual('10.5usd');
});
