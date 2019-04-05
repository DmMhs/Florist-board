import React from 'react';
import { shallow } from 'enzyme';

import ProductDetails from './ProductDetails';

it('renders without crashing', () => {
  const wrapper = shallow(
    <ProductDetails
      match={{ params: { id: 1 }, isExact: true, path: '', url: '' }}
    />
  );
  expect(wrapper.instance().state.title).not.toEqual('');
});
