import React, { Component } from 'react';
import ProductCard from './ProductCard/ProductCard';

import { Products } from '../../models/Products';
import { Product } from '../../models/Product';
import { CartItem } from '../../models/CartItem';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

import './ProductList.less';

interface ProductListState {
  showCart: boolean;
  cartProducts: Product[];
}

class ProductList extends Component<any, ProductListState> {
  constructor(props: Products) {
    super(props);
    this.state = {
      showCart: false,
      cartProducts: []
    };
  }

  addToCartClickedHandler = (
    productData: {
      title: string;
      images: string[];
      price: number;
      currency: string;
      available: boolean;
      key: number;
      id: string;
      addToCart: void;
    },
    event: any
  ) => {
    if (productData.available) {
      const cartProducts = this.state.cartProducts;
      const index = cartProducts.findIndex(i => {
        return i.id === productData.id;
      });
      const isInCart = index !== -1 ? true : false;
      if (!isInCart) {
        this.setState({
          cartProducts: [...cartProducts, productData]
        });
        event.target.classList.add('active');
      }
    }
  };
  toggleCartClickedHandler = (event: any) => {
    this.setState({
      showCart: !this.state.showCart
    });
    this.state.showCart
      ? event.target!.classList.add('active')
      : event.target!.classList.remove('active');
  };
  closeCartClickedHandler = () => {
    this.setState({
      showCart: false,
      cartProducts: []
    });
  };
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
          id={p.id}
          addToCart={() => this.addToCartClickedHandler(p as any, event as any)}
        />
      );
    });
    return (
      <div>
        <div className="cart-toggle" onClick={this.toggleCartClickedHandler}>
          <i className="fas fa-shopping-basket" />
          <span>{this.state.cartProducts.length}</span>
        </div>
        <ShoppingCart
          cartItems={this.state.cartProducts}
          showCart={this.state.showCart}
          closeCart={this.closeCartClickedHandler}
        />
        <div className="ProductList">{productList}</div>
      </div>
    );
  }
}

export default ProductList;
