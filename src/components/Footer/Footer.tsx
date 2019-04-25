import React, { useContext } from 'react';

import './Footer.less';
import labels from '../../config/labels';
import { AuthContext } from '../Auth/AuthContext';

const footer = () => {
  const context = useContext(AuthContext);
  return (
    <div className="Footer">
      <span>{labels[context.state.lang as string].footer}</span>
    </div>
  );
};

export default footer;
