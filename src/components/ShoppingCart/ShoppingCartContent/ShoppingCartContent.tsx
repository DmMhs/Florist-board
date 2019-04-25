import React, { useContext } from 'react';

import './ShoppingCartContent.less';
import { AuthContext } from '../../Auth/AuthContext';
import labels from '../../../config/labels';

interface ShoppingCartContentProps {
  totalPrice: number;
  cartItemsList: JSX.Element[];
  fixEmptyCart:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

const ShoppingCartContent = (props: ShoppingCartContentProps) => {
  const { totalPrice, cartItemsList } = props;
  const context = useContext(AuthContext);
  const totalPriceFormatted = totalPrice.toFixed(2);
  return cartItemsList.length > 0 ? (
    <div>
      <ul>
        <li>
          <span>
            {labels[context.state.lang as string].pages.shop.cart.title}
          </span>
          <span />
          <span>
            {labels[context.state.lang as string].pages.shop.cart.amount}
          </span>
          <span>
            {labels[context.state.lang as string].pages.shop.cart.price}
          </span>
          <span />
        </li>
        <hr />
        {cartItemsList}
      </ul>
      <div className="order">
        <p>
          {labels[context.state.lang as string].pages.shop.cart.total}{' '}
          {totalPriceFormatted}$
        </p>
        <button type="button" className="order-btn">
          {labels[context.state.lang as string].pages.shop.cart.orderBtn}
        </button>
      </div>
    </div>
  ) : (
    <div>
      <h4>{labels[context.state.lang as string].pages.shop.cart.empty}</h4>
      <button type="button" className="fix" onClick={props.fixEmptyCart}>
        <span>{labels[context.state.lang as string].pages.shop.cart.btn}</span>{' '}
        <i className="far fa-smile-wink" />
      </button>
    </div>
  );
};

export default ShoppingCartContent;
