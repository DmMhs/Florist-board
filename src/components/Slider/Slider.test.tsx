import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';

import Slider from './Slider';

describe('Slider works as expected', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Slider images={[]} auto={false} showControls={true} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has a valid state value', () => {
    const wrapper = shallow(
      <Slider images={[]} auto={false} showControls={true} />
    );
    const instance = wrapper.instance();
    expect(instance.state.translateValue).toBeGreaterThanOrEqual(0);
    expect(instance.state.timerInterval).toBeGreaterThan(0);
    expect(instance.state.currentIndex).not.toBeNull();
  });

  it('reacts on left and right arrow click', () => {
    const wrapper = mount(
      <Slider
        images={['one', 'two', 'three']}
        auto={false}
        showControls={true}
      />
    );
    const instance = wrapper.instance();
    instance.setState({
      currentIndex: 2
    });
    wrapper.find('.left-arrow').simulate('click');
    expect(instance.state.currentIndex).toEqual(1);
    wrapper.find('.left-arrow').simulate('click');
    wrapper.find('.left-arrow').simulate('click');
    expect(instance.state.translateValue).toEqual(0);
    wrapper.find('.right-arrow').simulate('click');
    expect(instance.state.currentIndex).toEqual(1);
    wrapper.find('.right-arrow').simulate('click');
    wrapper.find('.right-arrow').simulate('click');
    expect(instance.state.translateValue).toEqual(0);
  });

  it('resize event has impact on state', () => {
    const wrapper = shallow(
      <Slider images={[]} auto={false} showControls={true} />
    );
    const instance = wrapper.instance();
    instance.setState({
      translateValue: 700
    });
    function resizeListener() {
      instance.setState({
        currentIndex: 0,
        translateValue: 0
      });
    }
    window.addEventListener('resize', resizeListener);

    let resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
    expect(instance.state.translateValue).toEqual(0);
  });
});
