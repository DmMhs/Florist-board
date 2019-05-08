import React, { useContext } from 'react';

import './PageNotFound.less';
import { AppContext } from '../../AppContext';
import labels from '../../config/labels';

const pageNotFound = () => {
  const context = useContext(AppContext);
  return (
    <div className="PageNotFound">
      <h2>
        <span className="message">
          {context.state.lang === 'en'
            ? labels.en.pages.pageNotFound
            : labels.ua.pages.pageNotFound}
        </span>{' '}
        <i className="far fa-grimace" />
      </h2>
    </div>
  );
};

export default pageNotFound;
