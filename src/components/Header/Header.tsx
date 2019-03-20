import React from 'react';

import Navigation from './Navigation/Navigation';
import labels from '../../config/labels';
import './Header.less';

const header = () => {
  return (
    <div className="Header">
      <p className="info">
        <span>{labels.brand}</span>
        <span>{labels.adress}</span>
        <span>{labels.postCode}</span>
        <span>{labels.phone}</span>
      </p>
      <Navigation />
    </div>
  );
};

export default header;
