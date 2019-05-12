import React, { useContext } from 'react';

import { AppContext } from '../../../AppContext';
import './ProductsSort.less';

interface ProductsSortProps {
  sortOrder: string;
  sortOrderClicked:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  orderByClicked:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  sortBy: string;
  orderByOptionsRef: React.RefObject<HTMLDivElement>;
  orderByChanged: (orderBy: string) => void;
  mobileMode?: boolean;
  filterToggle?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}

const productsSort = (props: ProductsSortProps) => {
  const context = useContext(AppContext);
  const labels = context.state.labels;
  const lang = context.state.lang;

  const {
    orderByChanged,
    orderByClicked,
    orderByOptionsRef,
    sortOrderClicked,
    sortOrder,
    filterToggle,
    mobileMode,
    sortBy
  } = props;

  const sortByNameOrderIcon =
    props.sortOrder === 'default' ? (
      <i className="fas fa-sort-alpha-down" onClick={sortOrderClicked} />
    ) : (
      <i className="fas fa-sort-alpha-up" onClick={sortOrderClicked} />
    );

  const sortByPriceOrderIcon =
    sortOrder === 'default' ? (
      <i className="fas fa-sort-numeric-down" onClick={sortOrderClicked} />
    ) : (
      <i className="fas fa-sort-numeric-up" onClick={sortOrderClicked} />
    );

  const filterToggleIcon =
    mobileMode === true ? (
      <i className="fas fa-filter filter-toggle" onClick={filterToggle} />
    ) : null;

  const labelsRoot = labels[lang as string].pages.shop.sort;

  return (
    <div className="sort-order">
      {filterToggleIcon}
      <span>{labelsRoot.main}</span>
      <div className="dropdown">
        <button onClick={orderByClicked} className="dropbtn">
          {sortBy === 'name'
            ? labels[lang as string].pages.shop.sort.btn.byName.toUpperCase()
            : labels[lang as string].pages.shop.sort.btn.byPrice.toUpperCase()}{' '}
          <i className="fas fa-caret-down" />
        </button>
        <div ref={orderByOptionsRef} className="dropdown-content">
          {sortBy === 'name' ? (
            <a
              href="#"
              onClick={orderByChanged!.bind(props, labelsRoot.btn.byPrice)}
              className="sort-by-price-btn"
            >
              {labelsRoot.btn.byPrice} <i className="fas fa-dollar-sign" />
            </a>
          ) : (
            <a
              href="#"
              onClick={orderByChanged!.bind(props, labelsRoot.btn.byName)}
              className="sort-by-name-btn"
            >
              {labelsRoot.btn.byName} <i className="fas fa-signature" />
            </a>
          )}
        </div>
      </div>
      {sortBy === 'name' ? sortByNameOrderIcon : sortByPriceOrderIcon}
    </div>
  );
};

export default productsSort;
