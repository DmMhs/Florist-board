import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';

import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';

it('Navigation component matches a snapshot', () => {
  const wrapper = shallow(<Navigation />);
  expect(wrapper).toMatchSnapshot();
});
