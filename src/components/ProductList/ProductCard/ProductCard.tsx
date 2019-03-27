import React, { Component } from 'react';

import './ProductCard.less';
import { Product } from '../../../models/Product';
import Slider from '../../Slider/Slider';

interface ProductCardState {
  images: string[];
  title: string | null;
  price: number | null;
  currency: string | null;
  available: boolean | null;
  inCart: boolean;
  liked: boolean;
}

class ProductCard extends Component<Product, ProductCardState> {
  constructor(props: Product) {
    super(props);
    this.state = {
      images: [],
      title: null,
      price: null,
      currency: null,
      available: null,
      inCart: false,
      liked: false
    };
  }
  addToCartClickedHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).classList.contains('active-action')) {
      (event.target as HTMLDivElement).classList.remove('active-action');
      this.setState({
        inCart: false
      });
    } else {
      (event.target as HTMLDivElement).classList.add('active-action');
      this.setState({
        inCart: true
      });
    }
  };
  likeClickedHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).classList.contains('active-action')) {
      (event.target as HTMLDivElement).classList.remove('active-action');
      this.setState({
        liked: false
      });
    } else {
      (event.target as HTMLDivElement).classList.add('active-action');
      this.setState({
        liked: true
      });
    }
  };
  componentDidMount() {
    this.setState({
      images: this.props.images,
      title: this.props.title,
      price: this.props.price,
      currency: this.props.currency,
      available: this.props.available
    });
  }
  render() {
    return (
      <div className="ProductCard">
        <div className="image">
          <Slider images={this.props.images} auto={false} showControls={true} />
        </div>
        <div className="title">{this.state.title}</div>
        {this.state.available ? (
          <div className="price">
            {this.state.price}
            {this.state.currency}
          </div>
        ) : (
          <div className="price"> not available :(</div>
        )}
        <div className="action-panel">
          <i
            className="fas fa-cart-arrow-down"
            onClick={this.addToCartClickedHandler}
          />
          <i className="far fa-heart" onClick={this.likeClickedHandler} />
        </div>
      </div>
    );
  }
}

export default ProductCard;
