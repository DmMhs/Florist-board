import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './ProductCard.less';
import Slider from '../../Slider/Slider';
import { CartItem } from '../../../models/CartItem';

interface ProductCardState {}

class ProductCard extends Component<CartItem, ProductCardState> {
  render() {
    const { id, images, title, price, currency, available } = this.props;
    const actionIcon = this.props.inCart ? (
      <div>
        <div className="action">
          <i className="far fa-check-circle active" />
        </div>
      </div>
    ) : (
      <div>
        <div className="action">
          <i
            className="fas fa-cart-arrow-down"
            onClick={this.props.addToCart}
          />
        </div>
      </div>
    );
    return (
      <div className="ProductCard">
          <NavLink to={`/product-details/${id}`}>
            <i className="fas fa-info-circle info" />
          </NavLink>

        <div className="image">
          <Slider images={images} auto={false} showControls={true} />
        </div>
        <div className="title">{title}</div>
        {available ? (
          <div className="price">
            {price}
            {currency}
          </div>
        ) : (
          <div className="price">not available :(</div>
        )}
        <div className="action-panel">{available ? actionIcon : null}</div>
      </div>
    );
  }
}

export default ProductCard;
