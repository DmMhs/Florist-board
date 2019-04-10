import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';

import ProductList from './ProductList';
import { Product } from '../../models/Product';
import ProductCard from './ProductCard/ProductCard';
import { CartItem } from '../../models/CartItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductList products={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('matches a snapshot', () => {
  const wrapper = shallow(<ProductList products={[]} />);
  expect(wrapper).toMatchSnapshot();
});

it('products list is not empty', () => {
  const prod: Product = {
    title: 'title',
    images: ['pathtoimage'],
    price: 10,
    currency: 'usd',
    available: true
  };
  const wrapper = shallow(<ProductList products={[prod, prod, prod]} />);
  expect(wrapper.find('.ProductList').exists()).toEqual(true);
  expect(wrapper.find('.ProductList').text().length).toBeGreaterThan(0);
});

it('Removes cart items', () => {
  const prod: CartItem = {
    title: 'title',
    images: ['pathtoimage'],
    price: 10,
    currency: 'usd',
    available: true,
    key: 0,
    id: 'safasf',
    inCart: false,
    amount: 1
  };
  const wrapper = shallow(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.state = {
    showCart: false,
    cartProducts: [prod, prod, prod]
  };
  instance.handleRemoveCartItem(2);
  expect(instance.state.cartProducts.length).toEqual(2);
});

it('Add to cart works', () => {
  const prod: CartItem = {
    title: 'title',
    images: ['pathtoimage'],
    price: 10,
    currency: 'usd',
    available: true,
    key: 0,
    id: 'safasf',
    inCart: false,
    amount: 1
  };
  const wrapper = shallow(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.state = {
    showCart: false,
    cartProducts: []
  };
  instance.addToCartClickedHandler(prod);
  expect(instance.state.cartProducts.length).toEqual(1);
});

it('toggleCart works', () => {
  const wrapper = mount(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.state = {
    showCart: false,
    cartProducts: []
  };
  wrapper.find('.cart-toggle').simulate('click');
  expect(instance.state.showCart).toEqual(true);
});

it('state changes on filters toggle click', () => {
  const wrapper = mount(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.state = {
    showFilters: true
  };
  instance.filterToggleClickedHandler();
  expect(instance.state.showFilters).toBeFalsy();
});

it('Filter by price works', () => {
  const wrapper = mount(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.state = {
    showFilters: true,
    checkForPrice: false
  };
  expect(instance.state.checkForPrice).toBeFalsy();
  wrapper.find('.priceFrom').simulate('change');
  expect(instance.state.checkForPrice).toBeTruthy();
  instance.setState({
    showFilters: true,
    checkForPrice: false
  });
  wrapper.find('.priceTo').simulate('change');
  expect(instance.state.checkForPrice).toBeTruthy();
});

it('Click on sort button changes the state', () => {
  const wrapper = mount(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.state = {
    sortBy: 'name'
  };
  wrapper.find('.sort-by-price-btn').simulate('click');
  expect(instance.state.sortBy).toEqual('price');
});

it('sort order button changes the state', () => {
  const wrapper = mount(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.state = {
    sortBy: 'name',
    sortOrder: 'default'
  };
  wrapper.find('.fa-sort-alpha-down').simulate('click');
  expect(instance.state.sortOrder).toEqual('inverse');
});

it('In stock filter changes the state', () => {
  const wrapper = mount(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.state = {
    checkForAvailable: false
  };
  instance.inStockChangedHandler();
  expect(instance.state.checkForAvailable).toBeTruthy();
});

it('Close cart button changes the state', () => {
  const wrapper = mount(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.state = {
    showCart: true
  };
  instance.closeCartClickedHandler();
  expect(instance.state.showCart).toBeFalsy();
});

it('resize event has impact on state', () => {
  const wrapper = shallow(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.setState({
    mobileFiltersMode: undefined
  });
  const resizeListener = () => {
    if (window.innerWidth <= 920) {
      instance.setState({
        mobileFiltersMode: true
      });
      expect(instance.state.mobileFiltersMode).toBeTruthy();
    } else {
      instance.setState({
        mobileFiltersMode: false
      });
      expect(instance.state.mobileFiltersMode).toBeFalsy();
    }
  };
  window.addEventListener('resize', resizeListener);
  let resizeEvent = new Event('resize');
  window.dispatchEvent(resizeEvent);
  expect(instance.state.mobileFiltersMode).toBeDefined();
});

fit('filter toggler changes the state', () => {
  const wrapper = mount(<ProductList products={[]} />);
  const instance = wrapper.instance();
  instance.setState({
    showFilters: false
  });
  instance.filterToggleClickedHandler();
  expect(instance.state.showFilters).toBeTruthy();
});
