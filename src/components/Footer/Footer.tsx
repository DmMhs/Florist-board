import React, { useContext } from 'react';

import { AppContext } from '../../AppContext';
import './Footer.less';

const footer = () => {
  const context = useContext(AppContext);
  const labels = context.state.labels;
  const lang = context.state.lang;

  return (
    <div className="Footer">
      <span>{labels[lang as string].footer}</span>
    </div>
  );
};

export default footer;
