import React, { useContext } from 'react';

import { AppContext } from '../../../AppContext';
import './ShoppingCartContent.less';

interface ShoppingCartContentProps {
  totalPrice: number;
  cartItemsList: JSX.Element[];
  fixEmptyCart:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

const ShoppingCartContent = (props: ShoppingCartContentProps) => {
  const { totalPrice, cartItemsList } = props;
  const context = useContext(AppContext);
  const labels = context.state.labels;
  const lang = context.state.lang;
  const totalPriceFormatted = totalPrice.toFixed(2);
  return cartItemsList.length > 0 ? (
    <div>
      <ul>
        <li>
          <span>
            {labels[lang as string].pages.shop.cart.title}
          </span>
          <span />
          <span>
            {labels[lang as string].pages.shop.cart.amount}
          </span>
          <span>
            {labels[lang as string].pages.shop.cart.price}
          </span>
          <span />
        </li>
        <hr />
        {cartItemsList}
      </ul>
      <div className="order">
        <p>
          {labels[lang as string].pages.shop.cart.total}{' '}
          {totalPriceFormatted}$
        </p>
        <button type="button" className="order-btn">
          {labels[lang as string].pages.shop.cart.orderBtn}
        </button>
      </div>
    </div>
  ) : (
    <div>
      <h4>{labels[lang as string].pages.shop.cart.empty}</h4>
      <button type="button" className="fix" onClick={props.fixEmptyCart}>
        <span>{labels[lang as string].pages.shop.cart.btn}</span>{' '}
        <i className="far fa-smile-wink" />
      </button>
    </div>
  );
};

export default ShoppingCartContent;
