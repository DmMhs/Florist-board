import React from 'react';

import './ProductsFilter.less';

interface ProductsFilterProps {
  filterToggle:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  filtersSidebarRef: React.RefObject<HTMLDivElement>;
  filterToggleRef: React.RefObject<HTMLDivElement>;
  inStockChanged:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
  priceFromChanged:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
  priceToChanged:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
  mobileMode?: boolean;
}

const productsFilter = (props: ProductsFilterProps) => {
  const closeFiltersIcon =
    props.mobileMode === true ? (
      <i className="fas fa-times close" onClick={props.filterToggle} />
    ) : null;
  return (
    <div className="filter-wrapper hide" ref={props.filtersSidebarRef}>
      {props.mobileMode === false ? (
        <i
          className="fas fa-angle-double-right toggle"
          onClick={props.filterToggle}
          ref={props.filterToggleRef}
        />
      ) : null}
      <h2>
        <span>
          Filters <i className="fas fa-filter" />
        </span>{' '}
        {closeFiltersIcon}
      </h2>
      <form className="filter-form">
        <div className="filter-option available">
          <label>IN STOCK</label>
          <input type="checkbox" onChange={props.inStockChanged} />
        </div>
        <div className="filter-option price-range">
          <label>PRICE RANGE</label>
          <div>
            <input
              type="number"
              onChange={props.priceFromChanged}
              placeholder="from"
              min="0"
            />
            -
            <input
              type="number"
              onChange={props.priceToChanged}
              placeholder="to"
              min="0"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default productsFilter;
