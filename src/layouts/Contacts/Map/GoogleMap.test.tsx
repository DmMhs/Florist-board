import React from 'react';
import { shallow } from 'enzyme';

import GoogleMap from './GoogleMap';
describe('GoogleMap works as expected', () => {
  it('GoogleMap component matches a snapshot', () => {
    const wrapper = shallow(<GoogleMap url="dumb-url" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('window size has impact on state', () => {
    global.innerWidth = 600;
    let wrapper = shallow(<GoogleMap url="dumb-url" />);
    let instance = wrapper.instance();
    expect(instance.state.mobileMode).toBeTruthy();
    global.innerWidth = 800;
    wrapper = shallow(<GoogleMap url="dumb-url" />);
    instance = wrapper.instance();
    expect(instance.state.mobileMode).toBeFalsy();
  });

  it('resize event listener changes the state', () => {
    const wrapper = shallow(<GoogleMap url="dumb-url" />);
    const instance = wrapper.instance();
    instance.setState({
      mobileMode: true
    });
    global.innerWidth = 800;
    window.dispatchEvent(new Event('resize'));
    expect(instance.state.mobileMode).toBeFalsy();
    global.innerWidth = 600;
    window.dispatchEvent(new Event('resize'));
    expect(instance.state.mobileMode).toBeTruthy();
  });

  it('mapFetchedHandler changes the state', () => {
    const wrapper = shallow(<GoogleMap url="dumb-url" />);
    const instance = wrapper.instance();
    instance.setState({
      mobileMode: true,
      mapIsFetching: true
    });
    instance.mapFetchedHandler();
    expect(instance.state.mapIsFetching).toBeFalsy();
  });
});
