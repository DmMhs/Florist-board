import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import RightArrow from './RightArrow';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RightArrow show={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('has a proper style', () => {
  const wrapper = shallow(<RightArrow show={false} />);
  expect(wrapper.find('.right-arrow').prop('style')).toHaveProperty(
    'display',
    'none'
  );
});
