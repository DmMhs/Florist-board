import React from 'react';
import { shallow, mount } from 'enzyme';

import ShoppingCartItem from './ShoppingCartItem';
import { BrowserRouter } from 'react-router-dom';
import  AppContextProvider  from '../../../AppContext';

describe('ShoppingCartItem works as expected', () => {
  it('Home page matches a snapshot', () => {
    const wrapper = shallow(
      <ShoppingCartItem
        remove={() => {}}
        increaseAmount={() => {}}
        reduceAmount={() => {}}
        images={['', '']}
        title="Sunflower"
        id="qwerty"
        amount={10}
        cartItemPrice={150}
        currency={'usd'}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('Title changes with language', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
           <ShoppingCartItem
            remove={() => {}}
            increaseAmount={() => {}}
            reduceAmount={() => {}}
            images={['', '']}
            title="sunflowers"
            title_ua="соняшники"
            id="qwerty"
            amount={10}
            cartItemPrice={150}
            currency={'usd'}
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
    expect(wrapper.find('.name').text()).toEqual('sunflowers');
    context.setState({
      lang: 'ua'
    });
    expect(wrapper.find('.name').text()).toEqual('соняшники');
  });
});
