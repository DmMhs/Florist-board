import React from 'react';
import ReactDOM from 'react-dom';
import Shop from './Shop';
import { shallow } from 'enzyme';

import { Product } from '../../models/Product';
import { productsRef } from '../../firebase';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Shop />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('product images do fetch', async () => {
  const wrapper = shallow(<Shop />);
  const instance = wrapper.instance();

  await productsRef.once('value').then(snapshot => {
    instance.setState({
      fetchInProgress: true
    });
    const newProducts: Array<Product> = [];
    snapshot!.forEach((product: firebase.database.DataSnapshot) => {
      newProducts.push(product.val());
    });
    instance.setState({
      products: newProducts,
      fetchInProgress: false
    });
  });
  expect(instance.state.products.length).toBeGreaterThan(0);
});
