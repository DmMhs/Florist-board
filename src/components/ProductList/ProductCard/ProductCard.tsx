import React, { Component } from 'react';

import './ProductCard.less';
import { Product } from '../../../models/Product';
import Slider from '../../Slider/Slider';

interface ProductCardState {}

class ProductCard extends Component<any, ProductCardState> {
  render() {
    const { images, title, price, currency, available } = this.props;
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
          {available ? (
            <i
              className="fas fa-cart-arrow-down"
              onClick={this.props.addToCart}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default ProductCard;
