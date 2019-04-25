import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Spinner from '../../Spinner/Spinner';
import { Product } from '../../../models/Product';
import { productsRef } from '../../../firebase';
import { AuthContext } from '../../Auth/AuthContext';
import { BASE_URL } from '../../../config/main';
import { shareOverrideOGMeta } from '../../../services/share';
import labels from '../../../config/labels';
import './ProductDetails.less';

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

interface RouteComponentProps<P> {
  match: match<P>;
}

interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}
interface ProductDetailsState {
  productData: Product;
  fetchInProgress: boolean;
}

class ProductDetails extends Component<
  RouteComponentProps<MatchParams>,
  ProductDetailsState
> {
  constructor(props: RouteComponentProps<MatchParams>) {
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
      .child(this.props.match.params.id)
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
      backgroundImage: `url(${this.state.productData.images[0]})`
    };
    return (
      <AuthContext.Consumer>
        {value => (
          <div className="ProductDetails">
            {this.state.fetchInProgress === false ? (
              <div>
                <h1>{this.state.productData.title.toUpperCase()}</h1>
                <div className="product-info-wrapper">
                  <div className="image-wrapper">
                    <div className="image" style={imgStyle} />
                    <h3 className="price">
                      {this.state.productData.available === false ? (
                        <span>
                          {
                            labels[value.state.lang as string].pages
                              .productDetails.notAvailable
                          }{' '}
                          <i className="far fa-frown" />
                        </span>
                      ) : (
                        <div>
                          {
                            labels[value.state.lang as string].pages
                              .productDetails.only
                          }{' '}
                          <span className="accent">
                            {this.state.productData.price}$
                          </span>
                        </div>
                      )}
                    </h3>
                    {value.state.authenticationMethod === 'facebook' ? (
                      <div
                        className="button"
                        onClick={shareOverrideOGMeta.bind(
                          this,
                          BASE_URL +
                            `/product-details/${this.props.match.params.id}`,
                          this.state.productData.title,
                          this.state.productData.description as string,
                          this.state.productData.images[0]
                        )}
                      >
                        <span>
                          {
                            labels[value.state.lang as string].pages
                              .productDetails.facebookShare
                          }{' '}
                          <i className="fab fa-facebook-f" />
                        </span>
                      </div>
                    ) : null}

                    <button className="shopping-btn" type="button">
                      <NavLink to="/shop">
                        <span>
                          {
                            labels[value.state.lang as string].pages
                              .productDetails.goShopping
                          }
                        </span>{' '}
                        <i className="fas fa-shopping-cart" />
                      </NavLink>
                    </button>
                  </div>

                  <div className="info">
                    <h2>
                      {
                        labels[value.state.lang as string].pages.productDetails
                          .description
                      }
                    </h2>
                    <hr />
                    <p>{this.state.productData.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default ProductDetails;
