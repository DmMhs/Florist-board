import React from 'react';
import { shallow, mount } from 'enzyme';

import AppContextProvider from './AppContext';
import { BrowserRouter } from 'react-router-dom';

it('AppContext matches a snapshot', () => {
  const wrapper = shallow(<AppContextProvider />);
  expect(wrapper).toMatchSnapshot();
});

it('setLangHandler changes the lang', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider />
    </BrowserRouter>
  );
  const instance = wrapper.find('AppContextProvider').instance();
  instance.setState({
    lang: 'en'
  });
  instance.setLangHandler('uk');
  expect(instance.state.lang).toEqual('uk');
});
