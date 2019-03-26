import React, { Component } from 'react';
import Slider from '../Slider/Slider';

import './Home.less';
import ProductList from '../ProductList/ProductList';
import { productsRef } from '../../firebase';
import { Product } from '../../models/Product';
import Spinner from '../Spinner/Spinner';

interface HomeProps {}

interface HomeState {
  fetchedProducts: Array<Product>;
  fetchInProgress: boolean;
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      fetchedProducts: [],
      fetchInProgress: false
    };
  }

  componentDidMount() {
    this.setState({
      fetchInProgress: true
    });
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
        this.setState({
          fetchInProgress: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          fetchInProgress: false
        });
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
        {this.state.fetchInProgress ? <Spinner /> : null}
        <ProductList products={this.state.fetchedProducts} />
      </div>
    );
  }
}

export default Home;
