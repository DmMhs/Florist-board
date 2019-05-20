import React from 'react';
import { shallow, mount } from 'enzyme';

import Modal from './Modal';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../../AppContext';

describe('Modal works as expected', () => {
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
  it('slide-wrapper is not empty', () => {
    const jsxElMock = <span>dummy element</span>;
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Modal
            images={[jsxElMock, jsxElMock]}
            initial={1}
            prevClickedHandler={() => {}}
            nextClickedHandler={() => {}}
            closeModal={() => {}}
          />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      fetchInProgress: false
    });
    wrapper.update();
    expect(wrapper.find('.slide-wrapper').isEmpty()).toBeFalsy();
  });
  it('slide-wrapper is empty', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Modal
            images={[]}
            initial={1}
            prevClickedHandler={() => {}}
            nextClickedHandler={() => {}}
            closeModal={() => {}}
          />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      fetchInProgress: false
    });
    wrapper.update();
    expect(wrapper.find('.slide-wrapper').text().length).toEqual(0);
  });
});
