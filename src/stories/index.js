import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import App from '../App';
import Home from '../components/Home/Home';
import Shop from '../components/Shop/Shop';
import Gallery from '../components/Gallery/Gallery';
import Contacts from '../components/Contacts/Contacts';
import Spinner from '../components/Spinner/Spinner';
import Slider from '../components/Slider/Slider';
import ProductList from '../components/ProductList/ProductList';
import ProductCard from '../components/ProductList/ProductCard/ProductCard';
import Popup from '../components/Popup/Popup';
import AppContextProvider from '../AppContext';
import { BrowserRouter } from 'react-router-dom';

const productMock = {
  title: 'super cactus',
  images: [
    'https://cb2.scene7.com/is/image/CB2/PottedCactus39inSHS17/?$web_product_hero$&161221161846&wid=625&hei=625',
    'https://cb2.scene7.com/is/image/CB2/PottedCactus39inSHS17/?$web_product_hero$&161221161846&wid=625&hei=625'
  ],
  price: 10.26,
  currency: 'uah',
  available: true
};

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('Florist', module)
  .add('App', () => <App />)
  .add('Home', () => <Home />)
  .add('Shop', () => (
    <BrowserRouter>
      <AppContextProvider>
        <Shop />
      </AppContextProvider>
    </BrowserRouter>
  ))
  .add('Gallery', () => (
    <BrowserRouter>
      <AppContextProvider>
        <Gallery />
      </AppContextProvider>
    </BrowserRouter>
  ))
  .add('Contacts', () => (
    <BrowserRouter>
      <AppContextProvider>
        <Contacts />
      </AppContextProvider>
    </BrowserRouter>
  ))
  .add('Spinner', () => <Spinner />)
  .add('Slider', () => (
    <div style={{ width: '700px', height: '200px' }}>
      <Slider
        images={[
          'https://cb2.scene7.com/is/image/CB2/PottedCactus39inSHS17/?$web_product_hero$&161221161846&wid=625&hei=625',
          'https://cb2.scene7.com/is/image/CB2/PottedCactus39inSHS17/?$web_product_hero$&161221161846&wid=625&hei=625',
          'https://cb2.scene7.com/is/image/CB2/PottedCactus39inSHS17/?$web_product_hero$&161221161846&wid=625&hei=625'
        ]}
        auto={true}
        showControls={true}
      />
    </div>
  ))
  .add('ProductList', () => (
    <BrowserRouter>
      <AppContextProvider>
        <ProductList products={[productMock, productMock, productMock]} />
      </AppContextProvider>
    </BrowserRouter>
  ))
  .add('ProductCard', () => (
    <BrowserRouter>
      <AppContextProvider>
        <ProductCard {...productMock} />
      </AppContextProvider>
    </BrowserRouter>
  ))
  .add('Popup', () => <Popup message="added to cart" type="success" />);
