import React, { Component } from 'react';
import Slider from '../Slider/Slider';

import './Home.less';
import ProductList from '../ProductList/ProductList';
import { productsRef } from '../../firebase';
import { Product } from '../../models/Product';

interface HomeProps {}

interface HomeState {
  fetchedProducts: Array<Product>;
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      fetchedProducts: []
    };
  }

  componentDidMount() {
    productsRef
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          this.setState({
            fetchedProducts: [...this.state.fetchedProducts, data[key]]
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="Home">
        <Slider
          images={[
            'assets/images/florist-cut.png',
            'assets/images/Florist-banner-cutted.jpg',
            'assets/images/florist-cut.png',
            'assets/images/Florist-banner-cutted.jpg'
          ]}
        />
        <hr />
        <ProductList products={this.state.fetchedProducts} />
      </div>
    );
  }
}

export default Home;
