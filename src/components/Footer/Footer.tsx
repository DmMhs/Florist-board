import React, { useContext } from 'react';

import './Footer.less';
import labels from '../../config/labels';
import { AppContext } from '../../AppContext';

const footer = () => {
  const context = useContext(AppContext);
  return (
    <div className="Footer">
      <span>{labels[context.state.lang as string].footer}</span>
    </div>
  );
};

export default footer;
