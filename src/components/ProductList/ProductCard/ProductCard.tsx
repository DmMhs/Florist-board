import React, { Component } from 'react';

import './ProductCard.less';
import { Product } from '../../../models/Product';

interface ProductCardState {
  image: string | null;
  title: string | null;
  price: number | null;
  currency: string | null;
  inCart: boolean;
  liked: boolean;
}

class ProductCard extends Component<Product, ProductCardState> {
  constructor(props: Product) {
    super(props);
    this.state = {
      image: null,
      title: null,
      price: null,
      currency: null,
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
      image: this.props.img,
      title: this.props.title,
      price: this.props.price,
      currency: this.props.currency
    });
  }
  render() {
    const imgStyle = {
      backgroundImage: `url(${this.state.image})`
    };
    return (
      <div className="ProductCard">
        <div className="image" style={imgStyle} />
        <div className="title">{this.state.title}</div>
        <div className="price">
          {this.state.price}
          {this.state.currency}
        </div>
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
