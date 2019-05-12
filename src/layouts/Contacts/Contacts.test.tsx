import React from 'react';
import { shallow, mount } from 'enzyme';

import Contacts from './Contacts';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../AppContext';

describe('Contacts component works as expected', () => {
  it('matches a snapshot', () => {
    const wrapper = shallow(<Contacts />);
    expect(wrapper).toMatchSnapshot();
  });

  it('contacts are displayed', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Contacts />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en'
    });
    expect(wrapper.find('.Contacts').exists()).toBeTruthy();
  });
});
