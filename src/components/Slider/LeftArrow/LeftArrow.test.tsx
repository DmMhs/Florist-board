import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';

import LeftArrow from './LeftArrow';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LeftArrow show={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('has a proper style', () => {
  const wrapper = shallow(<LeftArrow show={false} />);
  expect(wrapper.find('.left-arrow').prop('style')).toHaveProperty(
    'display',
    'none'
  );
});
