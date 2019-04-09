import React from 'react';
import { shallow } from 'enzyme';

import ProductDetails from './ProductDetails';
import { productsRef } from '../../../firebase';

it('renders without crashing', () => {
  const wrapper = shallow(
    <ProductDetails
      match={{ params: { id: 1 }, isExact: true, path: '', url: '' }}
    />
  );
  expect(wrapper.instance().state.title).not.toEqual('');
});

it('product data do fetch', async () => {
  const wrapper = shallow(
    <ProductDetails
      match={{
        params: { id: '-Laz5nc-kJiI1uDubC9K' },
        isExact: true,
        path: '',
        url: ''
      }}
    />
  );
  const instance = wrapper.instance();
  instance.state = {
    productData: {},
    fetchInProgress: false
  };
  await productsRef
    .child(instance.props.match.params.id)
    .once('value')
    .then(snapshot => {
      instance.setState({
        productData: snapshot.val(),
        fetchInProgress: false
      });
    });
  expect(instance.state.productData.images.length).toBeGreaterThan(0);
});
