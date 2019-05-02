import React from 'react';
import { shallow } from 'enzyme';

import ShoppingCartItem from './ShoppingCartItem';

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
});
