import React, { Component, RefObject } from 'react';
import { NavLink } from 'react-router-dom';

import './ProductCard.less';
import Slider from '../../Slider/Slider';
import { CartItem } from '../../../models/CartItem';
import { AuthContext } from '../../Auth/AuthContext';
import { productsRef } from '../../../firebase';
import labels from '../../../config/labels';

declare global {
  interface Window {
    fbAsyncInit: () => void;
  }
}

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
      this.likeButtonRef.current!.classList.add('active');
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
    const {
      id,
      images,
      title,
      title_uk,
      price,
      currency,
      available,
      inCart,
      likedBy,
      description
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
              <div className="title">
                {value.state.lang === 'en' ? title : title_uk}
              </div>
              {available === true ? (
                <div className="price">
                  {price}
                  {currency}
                </div>
              ) : (
                <div className="price">
                  {labels[value.state.lang as string].pages.shop.notAvailable}
                </div>
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
