import React from 'react';
import { shallow, mount } from 'enzyme';

import ProductList from './ProductList';
import { CartItem } from '../../models/CartItem';
import AppContextProvider from '../../AppContext';
import { BrowserRouter } from 'react-router-dom';

it('matches a snapshot', () => {
  const wrapper = shallow(<ProductList products={[]} />);
  expect(wrapper).toMatchSnapshot();
});

it('products list is not empty', () => {
  const prod: CartItem = {
    title: 'title',
    images: ['pathtoimage'],
    price: 10,
    currency: 'usd',
    available: true,
    id: 'strinasfasfg',
    inCart: false
  };
  const wrapper = shallow(<ProductList products={[prod, prod, prod]} />);
  const instance = wrapper.instance();
  expect(instance.props.products.length).toBeGreaterThan(0);
});

it('Removes cart items', () => {
  window.confirm = jest.fn(() => true);
  const prod: CartItem = {
    title: 'title',
    images: ['pathtoimage'],
    price: 10,
    currency: 'usd',
    available: true,
    key: 0,
    id: 'safasf',
    inCart: true,
    amount: 1
  };
  const wrapper = shallow(<ProductList products={[prod, prod, prod]} />);
  const instance = wrapper.instance();
  instance.state = {
    showCart: false,
    cartProducts: [prod, prod, prod],
    popupMessages: []
  };
  instance.handleRemoveCartItem(2);
  expect(window.confirm).toBeCalled();
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
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ProductList products={[]} />
      </AppContextProvider>
    </BrowserRouter>
  );
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    lang: 'en'
  });
  const instance = wrapper.find('ProductList').instance();
  instance.state = {
    showCart: false,
    cartProducts: [],
    popupMessages: []
  };
  instance.addToCartClickedHandler(prod);
  expect(instance.state.cartProducts.length).toEqual(1);
});

it('toggleCart works', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ProductList products={[]} />
      </AppContextProvider>
    </BrowserRouter>
  );
  const instance = wrapper.find('ProductList').instance();
  instance.state = {
    showCart: false,
    cartProducts: []
  };
  wrapper.find('.cart-toggle').simulate('click');
  expect(instance.state.showCart).toEqual(true);
});

it('state changes on filters toggle click', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ProductList products={[]} />
      </AppContextProvider>
    </BrowserRouter>
  );
  const instance = wrapper.find('ProductList').instance();
  instance.state = {
    showFilters: true
  };
  instance.filterToggleClickedHandler();
  expect(instance.state.showFilters).toBeFalsy();
});

it('Filter by price works', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ProductList products={[]} />{' '}
      </AppContextProvider>
    </BrowserRouter>
  );
  const instance = wrapper.find('ProductList').instance();
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    userLogin: 'testLogin',
    userId: 'testId',
    userToken: 'testToken',
    authenticationMethod: undefined,
    lang: 'en',
    userAuthenticated: false
  });
  instance.setState({
    showFilters: true,
    checkForPrice: false
  });
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
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ProductList products={[]} />
      </AppContextProvider>
    </BrowserRouter>
  );
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    userLogin: 'testLogin',
    userId: 'testId',
    userToken: 'testToken',
    authenticationMethod: undefined,
    lang: 'en',
    userAuthenticated: false
  });
  const instance = wrapper.find('ProductList').instance();
  instance.state = {
    sortBy: 'name'
  };
  wrapper.find('.sort-by-price-btn').simulate('click');
  expect(instance.state.sortBy).toEqual('price');
});

it('sort order button changes the state', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ProductList products={[]} />
      </AppContextProvider>
    </BrowserRouter>
  );
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    userLogin: 'testLogin',
    userId: 'testId',
    userToken: 'testToken',
    authenticationMethod: undefined,
    lang: 'en',
    userAuthenticated: false
  });
  const instance = wrapper.find('ProductList').instance();
  instance.state = {
    sortBy: 'name',
    sortOrder: 'default'
  };
  wrapper.find('.fa-sort-alpha-down').simulate('click');
  expect(instance.state.sortOrder).toEqual('inverse');
});

it('In stock filter changes the state', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ProductList products={[]} />
      </AppContextProvider>
    </BrowserRouter>
  );
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    userLogin: 'testLogin',
    userId: 'testId',
    userToken: 'testToken',
    authenticationMethod: undefined,
    lang: 'en',
    userAuthenticated: false
  });
  const instance = wrapper.find('ProductList').instance();
  instance.state = {
    checkForAvailable: false
  };
  instance.inStockChangedHandler();
  expect(instance.state.checkForAvailable).toBeTruthy();
});

it('Close cart button changes the state', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ProductList products={[]} />
      </AppContextProvider>
    </BrowserRouter>
  );
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    userLogin: 'testLogin',
    userId: 'testId',
    userToken: 'testToken',
    authenticationMethod: undefined,
    lang: 'en',
    userAuthenticated: false
  });
  const instance = wrapper.find('ProductList').instance();
  instance.state = {
    showCart: true
  };
  instance.closeCartClickedHandler();
  expect(instance.state.showCart).toBeFalsy();
});

it('filter toggler changes the state', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ProductList products={[]} />
      </AppContextProvider>
    </BrowserRouter>
  );
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    userLogin: 'testLogin',
    userId: 'testId',
    userToken: 'testToken',
    authenticationMethod: undefined,
    lang: 'en',
    userAuthenticated: false
  });
  const instance = wrapper.find('ProductList').instance();
  instance.setState({
    showFilters: false
  });
  instance.filterToggleClickedHandler();
  expect(instance.state.showFilters).toBeTruthy();
  instance.filterToggleRef.current = null;
  instance.filterToggleClickedHandler();
  expect(instance.state.showFilters).toBeFalsy();
});

it('Changing of price range has impact on state', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ProductList products={[]} />
      </AppContextProvider>
    </BrowserRouter>
  );
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    userLogin: 'testLogin',
    userId: 'testId',
    userToken: 'testToken',
    authenticationMethod: undefined,
    lang: 'en',
    userAuthenticated: false
  });
  const instance = wrapper.find('ProductList').instance();
  instance.setState({
    showCart: false,
    cartProducts: [],
    checkForAvailable: false,
    checkForPrice: false,
    filterByPrice: { from: 0, to: Infinity },
    sortBy: 'name',
    sortOrder: 'default',
    showFilters: false,
    mobileFiltersMode: false,
    popupMessages: []
  });
  wrapper.find('.priceFrom').simulate('change', { target: { value: 4 } });
  wrapper.find('.priceTo').simulate('change', { target: { value: 10 } });
  expect(instance.state.filterByPrice).toEqual({ from: 4, to: 10 });
});

it('Clicking on "order by" changes "orderByOptionsRef" classList', () => {
  const wrapper = mount(
    <BrowserRouter>
      <AppContextProvider>
        <ProductList products={[]} />
      </AppContextProvider>
    </BrowserRouter>
  );
  const context = wrapper.find('AppContextProvider').instance();
  context.setState({
    userLogin: 'testLogin',
    userId: 'testId',
    userToken: 'testToken',
    authenticationMethod: undefined,
    lang: 'en',
    userAuthenticated: false
  });
  const instance = wrapper.find('ProductList').instance();
  expect(
    instance.orderByOptionsRef.current!.classList.contains('show')
  ).toBeFalsy();
  instance.orderByClickedHandler();
  expect(
    instance.orderByOptionsRef.current!.classList.contains('show')
  ).toBeTruthy();
});
