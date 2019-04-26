import React, { Component } from 'react';

import { productsRef } from '../../firebase';
import { Product } from '../../models/Product';
import Spinner from '../Spinner/Spinner';
import ProductList from '../ProductList/ProductList';
import { CartItem } from '../../models/CartItem';

import './Shop.less';

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

  public componentDidMount() {
    this.setState({
      fetchInProgress: true
    });
    productsRef.on('value', snapshot => {
      const newProducts: Product[] = [];
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

  public componentWillUnmount() {
    productsRef.off('value');
  }

  public render() {
    const { products } = this.state;
    const shopContent = this.state.fetchInProgress ? (
      <Spinner />
    ) : (
      <ProductList products={products as CartItem[]} />
    );
    return <div className="Shop">{shopContent}</div>;
  }
}

export default Shop;
