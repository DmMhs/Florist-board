import React, { Component } from 'react';

import { productsRef } from '../../firebase';
import { Product } from '../../models/Product';
import Spinner from '../Spinner/Spinner';
import ProductList from '../ProductList/ProductList';

interface ShopProps {}

class Shop extends Component<
  ShopProps,
  { products: Product[]; fetchInProgress: boolean }
> {
  constructor(props: ShopProps) {
    super(props);
    this.state = {
      products: [],
      fetchInProgress: false
    };
  }
  componentDidMount() {
    this.setState({
      fetchInProgress: true
    });
    productsRef.on('value', snapshot => {
      snapshot!.forEach(product => {
        this.setState({
          products: [...this.state.products, product.val()]
        });
      });
      this.setState({
        fetchInProgress: false
      });
    });
  }

  componentWillUnmount() {
    this.setState({
      products: []
    });
  }

  render() {
    return (
      <div className="Shop">
        {this.state.fetchInProgress ? <Spinner /> : null}
        <ProductList products={this.state.products} />
      </div>
    );
  }
}

export default Shop;
