import React from 'react';

import Navigation from './Navigation/Navigation';
import labels from '../../config/labels';
import './Header.less';

const header = () => {
  return (
    <div className="Header">
      <Navigation />
    </div>
  );
};

export default header;
