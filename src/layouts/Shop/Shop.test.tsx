import React from 'react';
import Shop from './Shop';
import { mount } from 'enzyme';

import { Product } from '../../models/Product';
import { productsRef } from '../../firebase';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../AppContext';
import labels from '../../config/labels';

describe('Shop works as expected', () => {
  it('product images do fetch', async () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Shop />
        </AppContextProvider>
      </BrowserRouter>
    );

    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute'
    });
    wrapper.update();
    const instance = wrapper.find('Shop').instance();
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
});
