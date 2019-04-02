import React, { Component } from 'react';

import './ProductCard.less';
import Slider from '../../Slider/Slider';
import { CartItem } from '../../../models/CartItem';

interface ProductCardState {}

class ProductCard extends Component<CartItem, ProductCardState> {
  render() {
    const { images, title, price, currency, available } = this.props;
    const actionIcon = this.props.inCart ? <i className="far fa-check-circle active"/> : <i
    className="fas fa-cart-arrow-down"
    onClick={this.props.addToCart}
  />;
    return (
      <div className="ProductCard">
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
        <div className="action-panel">
          {available ? actionIcon : null}
        </div>
      </div>
    );
  }
}

export default ProductCard;
