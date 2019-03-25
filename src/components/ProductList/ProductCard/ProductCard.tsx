import React, { Component } from 'react';

import './ProductCard.less';

class ProductCard extends Component<
  {
    title: string;
    imgSrc: string;
    price: number;
    currency: string;
  },
  any
> {
  constructor(props: any) {
    super(props);
    this.state = {
      image: 'assets/images/chamomile.jpg',
      title: 'Chamomile',
      price: 10,
      currency: 'usd',
      inCart: false,
      liked: false
    };
  }
  addToCartClickedHandler = (event: any) => {
    if (event.target.classList.contains('active-action')) {
      event.target.classList.remove('active-action');
      this.setState({
        inCart: false
      });
    } else {
      event.target.classList.add('active-action');
      this.setState({
        inCart: true
      });
    }
  };
  likeClickedHandler = (event: any) => {
    if (event.target.classList.contains('active-action')) {
      event.target.classList.remove('active-action');
      this.setState({
        liked: false
      });
    } else {
      event.target.classList.add('active-action');
      this.setState({
        liked: true
      });
    }
  };
  componentDidMount() {
    this.setState({
      image: this.props.imgSrc,
      title: this.props.title,
      price: this.props.price,
      currency: this.props.currency
    });
  }
  render() {
    return (
      <div className="ProductCard">
        <div
          className="image"
          style={{ background: `url(${this.state.image})` }}
        />
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
