import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
  // facebookShareClickedHandler = () => {
  //   return FB.ui(
  //     {
  //       method: 'share',
  //       href: `https://florist-ua.herokuapp.com/product-details/${
  //         this.props.match.params.id
  //       }`
  //     },
  //     function(response) {
  //       console.log(response);
  //     }
  //   );
  // };
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
                  <Helmet>
                    <title>{this.state.productData.title} | florist.ua</title>
                    <meta
                      property="og:url"
                      content={`href=https://florist-ua.herokuapp.com/product-details/${
                        this.state.productData.id
                      }`}
                    />
                    <meta property="og:type" content="website" />
                    <meta
                      property="og:title"
                      content={this.state.productData.title}
                    />
                    <meta
                      property="og:description"
                      content={this.state.productData.description}
                    />
                    <meta
                      property="og:image"
                      content={this.state.productData.images[0]}
                    />
                  </Helmet>
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
                        <div className="fb-share-button">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=https%3A//florist-ua.herokuapp.com/product-details/${
                              this.props.match.params.id
                            }`}
                            target="_blank"
                          >
                            SHARE <i className="fab fa-facebook-f" />
                          </a>
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
