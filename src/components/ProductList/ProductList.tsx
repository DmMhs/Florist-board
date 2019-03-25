import React, { Component } from 'react';

import ProductCard from './ProductCard/ProductCard';
import './ProductList.less';

class ProductList extends Component<{ products: any }, any> {
  render() {
    const productList = this.props.products.map(
      (
        p: { title: string; img: string; price: number; currency: string },
        index: number
      ) => {
        return (
          <ProductCard
            title={p.title}
            imgSrc={p.img}
            price={p.price}
            currency={p.currency}
            key={index}
          />
        );
      }
    );
    return <div className="ProductList">{productList}</div>;
  }
}

export default ProductList;
