import React from 'react';
import { shallow, mount } from 'enzyme';

import ProductDetails from './ProductDetails';
import { productsRef } from '../../../firebase';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
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
  expect(wrapper.instance().state.title).not.toEqual('');
});

it('details must be rendered', () => {
  const wrapper = mount(
    <BrowserRouter>
      <ProductDetails
        match={{
          params: { id: '-Laz5nc-kJiI1uDubC9K' },
          isExact: true,
          path: '',
          url: ''
        }}
      />
    </BrowserRouter>
  );
  expect(wrapper.find('.ProductDetails').exists()).toBeTruthy();
});

it('product data do fetch', async () => {
  const wrapper = mount(
    <BrowserRouter>
      <ProductDetails
        match={{
          params: { id: '-Laz5nc-kJiI1uDubC9K' },
          isExact: true,
          path: '',
          url: ''
        }}
      />
    </BrowserRouter>
  );
  const instance = wrapper.find('ProductDetails').instance();
  instance.state = {
    productData: {},
    fetchInProgress: false
  };
  console.log(wrapper.props);
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
