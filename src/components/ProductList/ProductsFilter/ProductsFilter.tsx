import React from 'react';

import './ProductsFilter.less';

interface ProductsFilterProps {
  filterToggle: () => void;
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
}

const productsFilter = (props: ProductsFilterProps) => {
  return (
    <div className="filter-wrapper hide" ref={props.filtersSidebarRef}>
      <i
        className="fas fa-angle-double-right toggle"
        onClick={props.filterToggle}
        ref={props.filterToggleRef}
      />
      <h2>
        Filters <i className="fas fa-filter" />
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
