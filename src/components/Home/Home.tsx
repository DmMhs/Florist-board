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
        <div className="slider-wrapper">
          <Slider
            images={[
              'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/banner%2Fbanner-1.png?alt=media&token=7ab01b99-0821-42be-a2c6-37ae67de7948',
              'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/banner%2Fbanner-2.jpg?alt=media&token=2334cb94-2d0b-4590-8039-6f3bdf80e7ed'
            ]}
            auto={true}
            showControls={true}
          />
        </div>

        <hr />
        {this.state.fetchInProgress ? <Spinner /> : null}
        <ProductList products={this.state.fetchedProducts} />
      </div>
    );
  }
}

export default Home;
