import React, { Component } from 'react';

import ProductCard from './ProductCard/ProductCard';
import './ProductList.less';

interface Product {
  title: string; 
  img: string; 
  price: number; 
  currency: string;
}
interface Products {
  products: Product[]
}

class ProductList extends Component<Products, {}> {
  render() {
    const productList = this.props.products.map(
      (
        p: Product,
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
