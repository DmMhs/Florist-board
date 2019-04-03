import React, { Component } from 'react';

import { CartItem } from '../../models/CartItem';
import './ShoppingCart.less';

interface ShoppingCartProps {
  cartItems: CartItem[];
  showCart: boolean;
  closeCart:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  remove: any;
}
interface ShoppingCartState {
  cartProducts: Partial<CartItem> & { amount: number }[];
}

class ShoppingCart extends Component<ShoppingCartProps, ShoppingCartState> {
  static getDerivedStateFromProps(
    props: ShoppingCartProps,
    state: ShoppingCartState
  ) {
    let initialSum = 0;
    props.cartItems.map((i: CartItem) => {
      initialSum += +i.price!;
    });
    initialSum.toFixed(2);
    return {
      cartProducts: props.cartItems,
      totalSum: initialSum
    };
  }
  constructor(props: any) {
    super(props);
    this.state = {
      cartProducts: []
    };
  }

  reduceAmountClickedHandler = (amount: number, index: number) => {
    if (amount > 1) {
      const newCart = { ...this.state.cartProducts };
      newCart[index].amount = newCart[index].amount - 1;
      this.setState({
        cartProducts: newCart
      });
    }
  };
  increaseAmountClickedHandler = (amount: number, index: number) => {
    const newCart = { ...this.state.cartProducts };
    newCart[index].amount = newCart[index].amount + 1;
    this.setState({
      cartProducts: newCart
    });
  };
  removeClickedHandler = (index: number) => {
    const newCartProducts = this.state.cartProducts.splice(index, 1);
    this.setState({
      cartProducts: newCartProducts
    });
  };
  render() {
    const style = {
      display: this.props.showCart ? 'flex' : 'none'
    };
    let totalPrice = 0;
    const cartItems = this.state.cartProducts;
    const cartItemsList = cartItems.map(
      (i: Partial<CartItem> & { amount: number }, index: number) => {
        totalPrice += +i.price! * i.amount!;
        return (
          <li className="cart-item" key={index}>
            <div
              className="cart-item-img"
              style={{
                display: 'flex',
                flexBasis: '20%',
                background: `url(${i.images![0]})`,
                width: '120px',
                height: '120px',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            />
            <span>{i.title}</span>
            <span className="amount">
              <i
                className="far fa-minus-square"
                onClick={() => this.reduceAmountClickedHandler(i.amount, index)}
              />
              {i.amount}
              <i
                className="far fa-plus-square"
                onClick={() =>
                  this.increaseAmountClickedHandler(i.amount, index)
                }
              />
            </span>
            <span>
              {(i.price! * i.amount!).toFixed(2)}
              {i.currency}
            </span>
            <span>
              <i
                className="fas fa-times"
                onClick={() => this.props.remove(index)}
              />
            </span>
          </li>
        );
      }
    );

    const cartContent =
      this.state.cartProducts.length > 0 ? (
        <div>
          <ul>
            <li>
              <span>PRODUCT</span>
              <span />
              <span>AMOUNT</span>
              <span>PRICE</span>
              <span />
            </li>
            <hr />
            {cartItemsList}
          </ul>
          <div className="order">
            <p>Total Sum: {totalPrice.toFixed(2)}$</p>
            <button type="button" className="order-btn">
              ORDER
            </button>
          </div>
        </div>
      ) : (
        <h4>
          cart is empty <i className="far fa-frown-open" />
        </h4>
      );
    return (
      <div className="ShoppingCart" style={style}>
        <div className="cart-content">
          <i
            className="fas fa-times close-cart"
            onClick={this.props.closeCart}
          />
          {cartContent}
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
