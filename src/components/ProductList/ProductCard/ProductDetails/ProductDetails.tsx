import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Spinner from '../../../Spinner/Spinner';
import { Product } from '../../../../models/Product';
import { productsRef } from '../../../../firebase';
import './ProductDetails.less';

interface ProductDetailsProps {}
interface ProductDetailsState {
  productData: Product;
  fetchInProgress: boolean;
}

class ProductDetails extends Component<
  ProductDetailsProps,
  ProductDetailsState
> {
  constructor(props: ProductDetailsProps) {
    super(props);
    this.state = {
      productData: {
        title: '',
        images: [],
        price: 0,
        currency: '',
        available: false,
        description: ''
      },
      fetchInProgress: false
    };
  }
  componentDidMount() {
    this.setState({
      fetchInProgress: true
    });
    productsRef
      .child((this.props as any).match.params.id)
      .once('value')
      .then(snapshot => {
        this.setState({
          productData: snapshot.val(),
          fetchInProgress: false
        });
      })
      .catch(error => console.log(error));
  }
  render() {
    const imgStyle = {
      background: `url(${this.state.productData.images[0]})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
    return (
      <div className="ProductDetails">
        {this.state.fetchInProgress === false ? (
          <div>
            <h1>{this.state.productData.title.toUpperCase()}</h1>
            <div className="product-info-wrapper">
              <div className="image-wrapper">
                <div className="image" style={imgStyle} />
                <h3 className="price">
                  only{' '}
                  <span className="accent">
                    {this.state.productData.price}$
                  </span>
                </h3>
                <button className="shopping-btn" type="button">
                  <NavLink to="/shop">
                    GO SHOPPING <i className="fas fa-shopping-cart" />
                  </NavLink>
                </button>
              </div>

              <div className="info">
                <h2>Description</h2>
                <hr />
                <p>{this.state.productData.description}</p>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default ProductDetails;
