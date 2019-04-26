import React, { useContext } from 'react';

import './ProductsSort.less';
import labels from '../../../config/labels';
import { AppContext } from '../../../AppContext';

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
  orderByChanged:
    | ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void)
    | undefined;
  mobileMode?: boolean;
  filterToggle?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}

const productsSort = (props: ProductsSortProps) => {
  const context = useContext(AppContext);

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

  return (
    <div className="sort-order">
      {filterToggleIcon}
      <span>{labels[context.state.lang as string].pages.shop.sort.main}</span>
      <div className="dropdown">
        <button onClick={orderByClicked} className="dropbtn">
          {sortBy === 'name'
            ? labels[
                context.state.lang as string
              ].pages.shop.sort.btn.byName.toUpperCase()
            : labels[
                context.state.lang as string
              ].pages.shop.sort.btn.byPrice.toUpperCase()}{' '}
          <i className="fas fa-angle-down" />
        </button>
        <div ref={orderByOptionsRef} className="dropdown-content">
          <a href="#" onClick={orderByChanged} className="sort-by-name-btn">
            {labels[context.state.lang as string].pages.shop.sort.btn.byName}
          </a>
          <a href="#" onClick={orderByChanged} className="sort-by-price-btn">
            {labels[context.state.lang as string].pages.shop.sort.btn.byPrice}
          </a>
        </div>
      </div>
      {sortBy === 'name' ? sortByNameOrderIcon : sortByPriceOrderIcon}
    </div>
  );
};

export default productsSort;
