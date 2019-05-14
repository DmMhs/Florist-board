import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { CartItem } from '../../../models/CartItem';
import { AppContext } from '../../../AppContext';
import './ShoppingCartItem.less';

const ShoppingCartItem = (
  props: Partial<CartItem> & { cartItemPrice: number }
) => {
  const {
    remove,
    increaseAmount,
    reduceAmount,
    images,
    title,
    title_ua,
    id,
    amount,
    cartItemPrice,
    currency
  } = props;
  const context = useContext(AppContext);
  const productTitle = context.state.lang === 'ua' ? title_ua : title;
  return (
    <li className="cart-item">
      <div
        className="cart-item-img"
        style={{
          backgroundImage: `url(${images![0]})`
        }}
      />
      <span className="product-name">
        {productTitle}
        <NavLink to={`/product-details/${id}`}>
          <i className="fas fa-info-circle info" />
        </NavLink>
      </span>
      <span className="amount">
        <i
          className="far fa-minus-square minus"
          onClick={
            reduceAmount as
              | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
              | undefined
          }
        />
        {amount}
        <i
          className="far fa-plus-square plus"
          onClick={
            increaseAmount as
              | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
              | undefined
          }
        />
      </span>
      <span>
        {cartItemPrice}
        {currency}
      </span>
      <span>
        <i
          className="far fa-trash-alt remove"
          onClick={
            remove as
              | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
              | undefined
          }
        />
      </span>
    </li>
  );
};

export default ShoppingCartItem;
