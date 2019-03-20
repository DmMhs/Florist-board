import React from 'react';

import Navigation from './Navigation/Navigation';
import './Header.less';

const header = () => {
  return (
    <div className="Header">
      <p className="info">
        <span>FLORIST.UA</span>
        <span>MARKET SQUARE, LVIV, UA</span>
        <span>23523</span>
        <span>+123-45-678</span>
      </p>
      <Navigation />
    </div>
  );
};

export default header;
