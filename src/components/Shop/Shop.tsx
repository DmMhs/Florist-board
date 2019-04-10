import React, { Component } from 'react';

import { productsRef } from '../../firebase';
import { Product } from '../../models/Product';
import Spinner from '../Spinner/Spinner';
import ProductList from '../ProductList/ProductList';
import { CartItem } from '../../models/CartItem';

interface ShopProps {}
interface ShopState {
  products: Product[];
  fetchInProgress: boolean;
}
class Shop extends Component<ShopProps, ShopState> {
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
      const newProducts: Array<Product> = [];
      snapshot!.forEach((product: firebase.database.DataSnapshot) => {
        newProducts.push({
          ...product.val(),
          id: product.key,
          inCart: false,
          amount: 1
        });
      });
      this.setState({
        products: newProducts,
        fetchInProgress: false
      });
    });
  }

  componentWillUnmount() {
    productsRef.off('value');
  }

  render() {
    const shopContent = this.state.fetchInProgress ? (
      <Spinner />
    ) : (
      <ProductList products={this.state.products as CartItem[]} />
    );
    return <div className="Shop">{shopContent}</div>;
  }
}

export default Shop;
