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
            {labels.navigation.home}
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop">{labels.navigation.shop}</NavLink>
        </li>
        <li>
          <NavLink to="/gallery">{labels.navigation.gallery}</NavLink>
        </li>
        <li>
          <NavLink to="/contacts">{labels.navigation.contacts}</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default navigation;
