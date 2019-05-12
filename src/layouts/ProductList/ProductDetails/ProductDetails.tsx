import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import {Spinner} from '../../../components';
import { Product } from '../../../models/Product';
import { productsRef } from '../../../firebase';
import { AppContext } from '../../../AppContext';
import { BASE_URL } from '../../../config/main';
import { shareOverrideOGMeta } from '../../../services/share'

import './ProductDetails.less';

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

interface RouteComponentProps<P> {
  match: Match<P>;
}

interface Match<P> {
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
        title_uk: '',
        images: [],
        price: 0,
        currency: '',
        available: false,
        description: '',
        description_uk: ''
      },
      fetchInProgress: false
    };
  }

  public componentDidMount() {
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

  public render() {
    const {
      title,
      title_uk,
      description,
      description_uk,
      available,
      price,
      images
    } = this.state.productData;

    const imgStyle = {
      backgroundImage: `url(${this.state.productData.images[0]})`
    };

    const context = this.context;
    const labels = context.state.labels;
    const lang = context.state.lang;
    const labelsRoot =
      labels[lang].pages.productDetails;

    return (
      <AppContext.Consumer>
        {value => (
          <div className="ProductDetails">
            {this.state.fetchInProgress === false ? (
              <div>
                <h1>
                  {lang === 'en'
                    ? title.toUpperCase()
                    : title_uk.toUpperCase()}
                </h1>
                <div className="product-info-wrapper">
                  <div className="image-wrapper">
                    <div className="image" style={imgStyle} />
                    <h3 className="price">
                      {available === false ? (
                        <span>
                          {labelsRoot.notAvailable}{' '}
                          <i className="far fa-frown" />
                        </span>
                      ) : (
                        <div>
                          {labelsRoot.only}{' '}
                          <span className="accent">{price}$</span>
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
                          value.state.lang === 'en' ? title : title_uk,
                          value.state.lang === 'en'
                            ? (description as string)
                            : (description_uk as string),
                          images[0]
                        )}
                      >
                        <span>
                          {labelsRoot.facebookShare}{' '}
                          <i className="fab fa-facebook-f" />
                        </span>
                      </div>
                    ) : null}

                    <button className="shopping-btn" type="button">
                      <NavLink to="/shop">
                        <span>{labelsRoot.goShopping}</span>{' '}
                        <i className="fas fa-shopping-cart" />
                      </NavLink>
                    </button>
                  </div>

                  <div className="info">
                    <h2>{labelsRoot.description}</h2>
                    <hr />
                    <p>
                      {lang === 'en' ? description : description_uk}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

ProductDetails.contextType = AppContext;

export default ProductDetails;
