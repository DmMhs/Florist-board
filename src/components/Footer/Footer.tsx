import React from 'react';

import './Footer.less';
import labels from '../../config/labels';

const footer = () => {
  return (
    <div className="Footer">
      <span>{labels.brand} © All Rights Reserved</span>
    </div>
  );
};

export default footer;
