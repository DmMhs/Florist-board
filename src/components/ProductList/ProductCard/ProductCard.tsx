import React, { Component, RefObject } from 'react';
import { NavLink } from 'react-router-dom';

import './ProductCard.less';
import Slider from '../../Slider/Slider';
import { CartItem } from '../../../models/CartItem';
import { AuthContext } from '../../Auth/AuthContext';
import { productsRef } from '../../../firebase';

interface ProductCardState {
  isLiked: boolean;
  isLikedBy: string[];
}

class ProductCard extends Component<CartItem, ProductCardState> {
  static getDerivedStateFromProps(props: CartItem, state: ProductCardState) {
    return {
      isLiked: props.likedBy
    };
  }

  private likeButtonRef: RefObject<HTMLDivElement>;

  constructor(props: CartItem) {
    super(props);
    this.likeButtonRef = React.createRef();
    this.state = {
      isLiked: false,
      isLikedBy: []
    };
  }
  componentDidMount() {
    if (this.state.isLiked === true) {
      if (!this.likeButtonRef.current!.classList.contains('active')) {
        this.likeButtonRef.current!.classList.add('active');
      }
    }
  }

  likeClickedHandler = async () => {
    this.likeButtonRef.current!.classList.toggle('active');
    await productsRef
      .child(this.props.id)
      .child('likedBy')
      .on('value', snapshot => {
        this.setState({
          isLiked: !this.state.isLiked,
          isLikedBy: snapshot!.val() === null ? [] : snapshot!.val()
        });
      });
    if (this.state.isLiked === true) {
      let newLikedByList = [...this.state.isLikedBy];
      const index = newLikedByList.findIndex((val: string) => {
        return val === this.context.state.userId;
      });
      newLikedByList.splice(index, 1);
      productsRef
        .child(this.props.id)
        .child('likedBy')
        .set(newLikedByList);
    } else {
      await productsRef.child(this.props.id).update({
        likedBy: [...this.state.isLikedBy, this.context.state.userId]
      });
    }
  };

  render() {
    const userAuthenticated = this.context.state.userAuthenticated;
    const {
      id,
      images,
      title,
      price,
      currency,
      available,
      inCart,
      likedBy
    } = this.props;

    const actionIcon = inCart ? (
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
      <AuthContext.Consumer>
        {value =>
          value && (
            <div className="ProductCard">
              <NavLink to={`/product-details/${id}`}>
                <i className="fas fa-info-circle info" />
              </NavLink>
              {value.state.userAuthenticated === true ? (
                <i
                  className="fas fa-heart like"
                  onClick={this.likeClickedHandler}
                  ref={this.likeButtonRef}
                />
              ) : null}
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
                {available ? actionIcon : null}{' '}
              </div>
            </div>
          )
        }
      </AuthContext.Consumer>
    );
  }
}

ProductCard.contextType = AuthContext;
export default ProductCard;
