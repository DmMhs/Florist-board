import React, { Component } from 'react';
import ProductCard from './ProductCard/ProductCard';

import { CartItem } from '../../models/CartItem';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

import './ProductList.less';

interface ProductListProps {
  products: CartItem[];
}
interface ProductListState {
  showCart: boolean;
  cartProducts: CartItem[];
}
class ProductList extends Component<ProductListProps, ProductListState> {
  constructor(props: ProductListProps) {
    super(props);
    this.state = {
      showCart: false,
      cartProducts: []
    };
  }

  addToCartClickedHandler = (productData: CartItem) => {
    if (productData.available) {
      const cartProducts = this.state.cartProducts;
      const index = cartProducts.findIndex((i: CartItem) => {
        return i.id === productData.id;
      });
      const isInCart = index !== -1 ? true : false;
      if (!isInCart) {
        productData.inCart = true;
        this.setState({
          cartProducts: [...cartProducts, productData]
        });
      }
    }
  };
  toggleCartClickedHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      showCart: !this.state.showCart
    });
  };
  closeCartClickedHandler = () => {
    this.setState({
      showCart: false
    });
  };
  handleRemoveCartItem = (index: number) => {
    this.state.cartProducts[index].inCart = false;
    this.state.cartProducts[index].amount = 1;
    const newProducts = [...this.state.cartProducts];
    newProducts.splice(index, 1);
    this.setState({
      cartProducts: newProducts
    });
  };
  render() {
    const { products } = this.props;
    const productList = products.map((p: CartItem, index: number) => {
      return (
        <ProductCard
          title={p.title}
          images={p.images}
          price={p.price}
          currency={p.currency}
          available={p.available}
          key={index}
          id={p.id}
          inCart={p.inCart}
          addToCart={() => this.addToCartClickedHandler(p as CartItem)}
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
          remove={this.handleRemoveCartItem}
        />
        <div className="ProductList">{productList}</div>
      </div>
    );
  }
}

export default ProductList;
