import React from 'react';

import Navigation from './Navigation/Navigation';
import constants from '../../config/constants';
import './Header.less';

const header = () => {
  return (
    <div className="Header">
      <p className="info">
        <span>{constants.brand}</span>
        <span>{constants.adress}</span>
        <span>{constants.postCode}</span>
        <span>{constants.phone}</span>
      </p>
      <Navigation />
    </div>
  );
};

export default header;
