import React from 'react';
import { shallow, mount } from 'enzyme';

import Header from './Header';

describe('Header works as expected', () => {
  it('Header component matches a snapshot', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
