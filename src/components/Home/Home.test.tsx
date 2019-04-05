import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { waitForState } from 'enzyme-async-helpers';

import { homeImagesRef } from '../../firebase';
import Home from './Home';

it('Home component matches a snapshot', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper).toMatchSnapshot();
});

it('has a valid state value', () => {
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();
  instance.setState({
    bannerImages: ['zero', 'one', 'two']
  });

  expect(instance.state.bannerImages.length).toEqual(3);
});

it('banner images do fetch', async () => {
  const wrapper = shallow(<Home />);
  const instance = wrapper.instance();

  await homeImagesRef.once('value').then(snapshot => {
    instance.setState({
      isFetching: true
    });
    const newImages: string[] = [];
    snapshot!.forEach(imgRef => {
      newImages.push(imgRef.val());
    });
    instance.setState({
      bannerImages: newImages,
      isFetching: false
    });
  });
  expect(instance.state.bannerImages.length).toBeGreaterThan(0);
});
