import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';

import Slide from './Slide';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Slide imgSrc={'some/test/image/src'} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('has imgSrc in props', () => {
  const wrapper = shallow(<Slide imgSrc={'some/test/image/src'} />);
  const instance = wrapper.instance();
  expect(wrapper.props!.imgSrc).toBeDefined;
});
