import React, { Component } from 'react';

import { CartItem } from '../../models/CartItem';
import './ShoppingCart.less';
import ShoppingCartItem from './ShoppingCartItem/ShoppingCartItem';
import ShoppingCartContent from './ShoppingCartContent/ShoppingCartContent';

interface ShoppingCartProps {
  cartItems: CartItem[];
  showCart: boolean;
  closeCart:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  remove: ((index: number) => void) | undefined;
}
interface ShoppingCartState {
  cartProducts: Partial<CartItem> & { amount: number }[];
}

class ShoppingCart extends Component<ShoppingCartProps, ShoppingCartState> {
  public static getDerivedStateFromProps(
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
  constructor(props: ShoppingCartProps) {
    super(props);
    this.state = {
      cartProducts: []
    };
  }

  private reduceAmountClickedHandler = (amount: number, index: number) => {
    if (amount > 1) {
      const newCart = { ...this.state.cartProducts };
      newCart[index].amount = newCart[index].amount - 1;
      this.setState({
        cartProducts: newCart
      });
    }
  };
  private increaseAmountClickedHandler = (index: number) => {
    const newCart = { ...this.state.cartProducts };
    newCart[index].amount = newCart[index].amount + 1;
    this.setState({
      cartProducts: newCart
    });
  };
  private removeClickedHandler = (index: number) => {
    const newCartProducts = this.state.cartProducts.splice(index, 1);
    this.setState({
      cartProducts: newCartProducts
    });
  };
  public render() {
    const { showCart, closeCart, remove } = this.props;
    const { cartProducts } = this.state;

    const style = {
      display: showCart ? 'flex' : 'none'
    };

    let totalPrice = 0;
    let cartItemPrice = 0;
    const cartItems = cartProducts;

    const cartItemsList = cartItems.map(
      (i: Partial<CartItem> & { amount: number }, index: number) => {
        totalPrice += +i.price! * i.amount!;
        cartItemPrice = +(i.price! * i.amount!).toFixed(2);
        return (
          <ShoppingCartItem
            remove={remove!.bind(this, index)}
            increaseAmount={
              this.increaseAmountClickedHandler.bind(this, index) as
                | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
                | undefined
            }
            reduceAmount={
              this.reduceAmountClickedHandler.bind(this, i.amount, index) as
                | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
                | undefined
            }
            images={i.images as string[]}
            title={i.title as string}
            title_ua={i.title_ua as string}
            id={i.id as string}
            amount={i.amount}
            cartItemPrice={cartItemPrice}
            currency={i.currency as string}
            key={index}
          />
        );
      }
    );

    return (
      <div className="ShoppingCart" style={style}>
        <div className="cart-content">
          <i className="fas fa-times close-cart" onClick={closeCart} />
          <ShoppingCartContent
            cartItemsList={cartItemsList as JSX.Element[]}
            totalPrice={totalPrice}
            fixEmptyCart={closeCart}
          />
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
