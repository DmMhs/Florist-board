import React, { Component } from 'react';

import ProductCard from './ProductCard/ProductCard';
import { Product } from '../../models/Product';
import { Products } from '../../models/Products';
import './ProductList.less';

class ProductList extends Component<Products, {}> {
  render() {
    const { products } = this.props;
    const productList = products.map((p: Product, index: number) => {
      return (
        <ProductCard
          title={p.title}
          images={p.images}
          price={p.price}
          currency={p.currency}
          available={p.available}
          key={index}
        />
      );
    });
    return <div className="ProductList">{productList}</div>;
  }
}

export default ProductList;
