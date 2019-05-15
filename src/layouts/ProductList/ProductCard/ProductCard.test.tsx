import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';

import AppContextProvider from '../../../AppContext';
import ProductCard from './ProductCard';
import labels from '../../../config/labels';

describe('ProductCard works as expected', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ProductCard
          title="some"
          images={['test', 'product']}
          price={10.5}
          currency="usd"
          available={false}
          key={0}
          id={'asfasf'}
          inCart={false}
        />
      </MemoryRouter>
    );
    expect(wrapper.find(ProductCard)).toMatchSnapshot();
  });

  it('Property "available" has impact on price displaying', () => {
    let wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ProductCard
            title="some"
            images={['test', 'product']}
            price={10.5}
            currency="usd"
            available={false}
            key={0}
            id={'asfasf'}
            inCart={false}
            addToCart={() => {}}
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
    expect(wrapper.find('.price').text()).toEqual('not available :(');
    const wrapper2 = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ProductCard
            title="some"
            images={['test', 'product']}
            price={10.5}
            currency="usd"
            available={true}
            key={0}
            id={'asfasf'}
            inCart={false}
            addToCart={() => {}}
          />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context2 = wrapper2.find('AppContextProvider').instance();
    context2.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute'
    });
    wrapper2.update();
    expect(wrapper2.find('.price').text()).toEqual('10.5usd');
  });

  it('likeClickedHandler changes state of component', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <ProductCard
            title="some"
            images={['test', 'product']}
            price={10.5}
            currency="usd"
            available={true}
            key={0}
            inCart={false}
            addToCart={() => {}}
          />
        </AppContextProvider>
      </BrowserRouter>
    );

    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      userLogin: 'safasf',
      userId: 'rqwrqw',
      userToken: 'safas',
      userAuthenticated: true,
      authenticationMethod: undefined,
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute'
    });
    wrapper.update();
    const instance = wrapper.find('ProductCard').instance();
    instance.setState({
      isLikedBy: [],
      isLiked: true
    });
    instance.likeClickedHandler();
    expect(
      instance.likeButtonRef!.current.classList.contains('active')
    ).toBeTruthy();
  });
});
