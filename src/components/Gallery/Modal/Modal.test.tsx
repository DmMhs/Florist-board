import React from 'react';
import { shallow, mount } from 'enzyme';

import Modal from './Modal';

it('Modal component matches a snapshot', () => {
  const wrapper = shallow(
    <Modal
      images={[]}
      initial={1}
      prevClickedHandler={() => {}}
      nextClickedHandler={() => {}}
      closeModal={() => {}}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it('Active slide is displayed', () => {
  const wrapper = shallow(
    <Modal
      images={[<img className="image" />, <img className="image" />]}
      initial={1}
      prevClickedHandler={() => {}}
      nextClickedHandler={() => {}}
      closeModal={() => {}}
    />
  );

  expect(wrapper.find('.image').exists()).toBeTruthy();

  const wrapper2 = shallow(
    <Modal
      images={[]}
      initial={1}
      prevClickedHandler={() => {}}
      nextClickedHandler={() => {}}
      closeModal={() => {}}
    />
  );

  expect(wrapper2.find('.image').exists()).toBeFalsy();
});
