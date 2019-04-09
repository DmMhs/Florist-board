import React from 'react';
import { shallow } from 'enzyme';

import ProductsFilter from './ProductsFilter';

it('matches a snapshot', () => {
  const wrapper = shallow(<ProductsFilter />);
  expect(wrapper).toMatchSnapshot();
});
