import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './ProductDetails.less';

class ProductDetails extends Component {
  render() {
    const params = JSON.parse(
      decodeURIComponent((this.props as any).match.params.data)
    );
    const { title, price, images, currency } = params;

    let newUrl = '';
    const firstPart = images[0].slice(0, 72);
    let secondPart = images[0].slice(72, images[0].length);
    secondPart = secondPart.replace(/\//gi, '%2F');
    newUrl = firstPart + secondPart;

    const imgStyle = {
      background: `url(${newUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
    return (
      <div className="ProductDetails">
        <h1>{title.toUpperCase()}</h1>
        <div className="product-info-wrapper">
          <div className="image-wrapper">
            <div className="image" style={imgStyle} />
            <h3 className="price">
              only <span className="accent">{price}$</span>
            </h3>
            <button className="shopping-btn" type="button">
              <NavLink to="/shop">GO SHOPPING</NavLink>
            </button>
          </div>

          <div className="info">
            <h2>Description</h2>
            <hr />
            <p>
              Let's make some happy little clouds in our world. Here's something
              that's fun. See there, told you that would be easy. Maybe he has a
              little friend that lives right over here. Those great big fluffy
              clouds. Every day I learn. Isn't that fantastic? You can just push
              a little tree out of your brush like that. You don't want to kill
              all your dark areas they are very important. Imagination is the
              key to painting. This is the time to get out all your
              flustrations, much better than kicking the dog around the house or
              taking it out on your spouse. We can always carry this a step
              further. There's really no end to this.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
