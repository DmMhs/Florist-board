import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon } from 'react-share';

import Spinner from '../../Spinner/Spinner';
import { Product } from '../../../models/Product';
import { productsRef } from '../../../firebase';
import './ProductDetails.less';
import Helmet from 'react-helmet';
import { AuthContext } from '../../Auth/AuthContext';

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
        {value =>
          value && (
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
                            not in stock <i className="far fa-frown" />
                          </span>
                        ) : (
                          <div>
                            only{' '}
                            <span className="accent">
                              {this.state.productData.price}$
                            </span>
                          </div>
                        )}
                      </h3>
                      {value.state.authenticationMethod === 'facebook' ? (
                        <div className="button-wrapper">
                          <FacebookShareButton
                            url={`https://florist-ua.herokuapp.com/product-details/${
                              this.props.match.params.id
                            }`}
                          >
                            <div>
                              <span> SHARE</span>
                              <FacebookIcon size={50} />
                            </div>
                          </FacebookShareButton>
                        </div>
                      ) : null}

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
                      <img
                        src={this.state.productData.images[1]}
                        style={{ maxHeight: '200px' }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <Spinner />
              )}
            </div>
          )
        }
      </AuthContext.Consumer>
    );
  }
}

export default ProductDetails;
