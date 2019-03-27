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
    productsRef.on('value', snapshot => {
      this.setState({
        fetchInProgress: true
      });
      const newProducts: Array<Product> = [];
      snapshot!.forEach((product: firebase.database.DataSnapshot) => {
        newProducts.push(product.val());
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
    const productsEmpty = this.state.products.length === 0;
    return (
      <div className="Shop">
        {this.state.fetchInProgress ? <Spinner /> : null}
        <ProductList products={productsEmpty ? [] : this.state.products} />
      </div>
    );
  }
}

export default Shop;
