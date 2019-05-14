import React, { Component, RefObject } from 'react';
import { NavLink } from 'react-router-dom';

import { Slider } from '../../../components';
import { CartItem } from '../../../models/CartItem';
import { AppContext } from '../../../AppContext';
import { productsRef } from '../../../firebase';
import './ProductCard.less';
import { deleteProduct } from '../../../services/deleteProduct';

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
  public static getDerivedStateFromProps(
    props: CartItem,
    state: ProductCardState
  ) {
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
  public componentDidMount() {
    if (this.state.isLiked === true) {
      this.likeButtonRef.current!.classList.add('active');
    }
  }

  private likeClickedHandler = async () => {
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
      const newLikedByList = [...this.state.isLikedBy];
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

  public render() {
    console.log(this.props);
    const {
      id,
      images,
      title,
      title_ua,
      price,
      currency,
      available,
      inCart
    } = this.props;

    const context = this.context;
    const labels = context.state.labels;
    const lang = context.state.lang;

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

    const adminIcons =
      context.state.userRole === 'admin' ? (
        <div className="adminIcons">
          <NavLink to={`/admin/edit-product?id=${id}`}>
            <i className="far fa-edit" />
          </NavLink>
          <i
            className="far fa-trash-alt"
            onClick={deleteProduct.bind(this, id, title.toLowerCase())}
          />
        </div>
      ) : null;

    return (
      <AppContext.Consumer>
        {value =>
          value && (
            <div className="ProductCard">
              {adminIcons}
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
              <div className="title">{lang === 'en' ? title : title_ua}</div>
              {available === true ? (
                <div className="price">
                  {price}
                  {currency}
                </div>
              ) : (
                <div className="price">
                  {labels[lang].pages.shop.notAvailable}
                </div>
              )}
              <div className="action-panel">
                {available ? actionIcon : null}{' '}
              </div>
            </div>
          )
        }
      </AppContext.Consumer>
    );
  }
}

ProductCard.contextType = AppContext;

export default ProductCard;
