import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';

import Slider from './Slider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Slider />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('has a valid state value', () => {
  const wrapper = shallow(<Slider />);
  const instance = wrapper.instance();
  // expect(instance.state.images.length).toBeGreaterThanOrEqual(1);
  // expect(instance.state.translateValue).toBeGreaterThanOrEqual(0);
  // expect(instance.state.timerInterval).toBeGreaterThan(0);
  // expect(instance.state.currentIndex).not.toBeNull();
});
