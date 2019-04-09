import React from 'react';

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
  orderByChanged:
    | ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void)
    | undefined;
  mobileMode?: boolean;
  filterToggle?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}

const productsSort = (props: ProductsSortProps) => {
  const sortByNameOrderIcon =
    props.sortOrder === 'default' ? (
      <i className="fas fa-sort-alpha-down" onClick={props.sortOrderClicked} />
    ) : (
      <i className="fas fa-sort-alpha-up" onClick={props.sortOrderClicked} />
    );
  const sortByPriceOrderIcon =
    props.sortOrder === 'default' ? (
      <i
        className="fas fa-sort-numeric-down"
        onClick={props.sortOrderClicked}
      />
    ) : (
      <i className="fas fa-sort-numeric-up" onClick={props.sortOrderClicked} />
    );
  const filterToggleIcon =
    props.mobileMode === true ? (
      <i className="fas fa-filter filter-toggle" onClick={props.filterToggle} />
    ) : null;
  return (
    <div className="sort-order">
      {filterToggleIcon}
      <span>sort by</span>
      <div className="dropdown">
        <button onClick={props.orderByClicked} className="dropbtn">
          {props.sortBy.toUpperCase()} <i className="fas fa-angle-down" />
        </button>
        <div ref={props.orderByOptionsRef} className="dropdown-content">
          <a
            href="#"
            onClick={props.orderByChanged}
            className="sort-by-name-btn"
          >
            name
          </a>
          <a
            href="#"
            onClick={props.orderByChanged}
            className="sort-by-price-btn"
          >
            price
          </a>
        </div>
      </div>
      {props.sortBy === 'name' ? sortByNameOrderIcon : sortByPriceOrderIcon}
    </div>
  );
};

export default productsSort;
