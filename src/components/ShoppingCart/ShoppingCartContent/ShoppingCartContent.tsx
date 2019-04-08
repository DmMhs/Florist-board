import React from 'react';

import './ShoppingCartContent.less';

interface ShoppingCartContentProps {
  totalPrice: number;
  cartItemsList: JSX.Element[];
  fixEmptyCart: any;
}

const ShoppingCartContent = (props: ShoppingCartContentProps) => {
  const { totalPrice, cartItemsList } = props;
  const totalPriceFormatted = totalPrice.toFixed(2);
  return cartItemsList.length > 0 ? (
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
        <p>Total Sum: {totalPriceFormatted}$</p>
        <button type="button" className="order-btn">
          ORDER
        </button>
      </div>
    </div>
  ) : (
    <div>
      <h4>cart is empty</h4>
      <button type="button" className="fix" onClick={props.fixEmptyCart}>
        <span>LET'S FIX IT</span> <i className="far fa-smile-wink" />
      </button>
    </div>
  );
};

export default ShoppingCartContent;
