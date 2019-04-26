import React from 'react';
import { shallow } from 'enzyme';

import Contacts from './Contacts';

it('matches a snapshot', () => {
  const wrapper = shallow(<Contacts />);
  expect(wrapper).toMatchSnapshot();
});
