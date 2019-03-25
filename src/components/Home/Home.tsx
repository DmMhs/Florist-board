import React, { Component } from 'react';
import Slider from '../Slider/Slider';

import './Home.less';
import ProductList from '../ProductList/ProductList';
import { productsRef } from '../../firebase';

class Home extends Component<any, { fetchedProducts: any }> {
  constructor(props: any) {
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
        // this.state.fetchedProducts.map(p => {
        //   productsRef.push(p);
        // });
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
