import React from 'react';
import { NavLink } from 'react-router-dom';

import labels from '../../../config/labels';
import './Navigation.less';

const navigation = () => {
  return (
    <div className="Navigation">
      <ul>
        <li>
          <NavLink to="/" exact>
            {labels.navigation.home} <i className="fas fa-home" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop">
            {labels.navigation.shop} <i className="fas fa-leaf" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery">
            {labels.navigation.gallery} <i className="far fa-image" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacts">
            {labels.navigation.contacts} <i className="fas fa-map-marker-alt" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default navigation;
