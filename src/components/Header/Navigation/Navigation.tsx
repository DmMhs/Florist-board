import React from 'react';
import { NavLink } from 'react-router-dom';

import constants from '../../../config/constants';
import './Navigation.less';

const navigation = () => {
  return (
    <div className="Navigation">
      <ul>
        <li>
          <NavLink to="/" exact>
            {constants.navigation.home}
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop">{constants.navigation.shop}</NavLink>
        </li>
        <li>
          <NavLink to="/gallery">{constants.navigation.gallery}</NavLink>
        </li>
        <li>
          <NavLink to="/contacts">{constants.navigation.contacts}</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default navigation;
