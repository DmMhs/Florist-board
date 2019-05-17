import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import ProductDetails from './ProductDetails';
import { productsRef } from '../../../firebase';
import AppContextProvider from '../../../AppContext';
import labels from '../../../config/labels';

describe('ProductDetails works as expected', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ProductDetails
            match={{
              params: { id: '-Laz5nc-kJiI1uDubC9K' },
              isExact: true,
              path: '',
              url: ''
            }}
          />
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
    expect(wrapper).toMatchSnapshot();
  });

  it('details must be rendered', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ProductDetails
            match={{
              params: { id: '-Laz5nc-kJiI1uDubC9K' },
              isExact: true,
              path: '',
              url: ''
            }}
          />
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
    expect(wrapper.find('.ProductDetails').exists()).toBeTruthy();
  });

  it('product data do fetch', async () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ProductDetails
            match={{
              params: { id: '-Laz5nc-kJiI1uDubC9K' },
              isExact: true,
              path: '',
              url: ''
            }}
          />
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
    const instance = wrapper.find('ProductDetails').instance();
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
  it('Details are displayed when fetch is over', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ProductDetails
            match={{
              params: { id: 'any' },
              isExact: true,
              path: '',
              url: ''
            }}
          />
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
    const instance = wrapper.find('ProductDetails').instance();
    instance.setState({
      fetchInProgress: true
    });
    expect(wrapper.find('.product-info-wrapper').exists()).toBeFalsy();
    instance.setState({
      fetchInProgress: false
    });
    wrapper.update();
    expect(wrapper.find('.product-info-wrapper').exists()).toBeTruthy();
  });
});
