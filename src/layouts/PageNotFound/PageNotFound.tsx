import React, { useContext } from 'react';

import './PageNotFound.less';
import { AppContext } from '../../AppContext';

const pageNotFound = () => {
  const context = useContext(AppContext);
  const labels = context.state.labels;
  const lang = context.state.lang;

  return (
    <div className="PageNotFound">
      <h2>
        <span className="message">
          {labels[lang as string].pages.pageNotFound}
        </span>{' '}
        <i className="far fa-grimace" />
      </h2>
    </div>
  );
};

export default pageNotFound;
