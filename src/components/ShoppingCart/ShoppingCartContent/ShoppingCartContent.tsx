import React from 'react';

interface ShoppingCartContentProps {
  totalPrice: number;
  cartItemsList: JSX.Element[];
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
    <h4>
      cart is empty <i className="far fa-frown-open" />
    </h4>
  );
};

export default ShoppingCartContent;
