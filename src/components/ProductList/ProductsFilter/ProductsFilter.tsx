import React, { useContext } from 'react';

import labels from '../../../config/labels';
import { AppContext } from '../../../AppContext';

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
  const context = useContext(AppContext);

  const {
    filterToggle,
    filterToggleRef,
    inStockChanged,
    priceFromChanged,
    priceToChanged,
    filtersSidebarRef
  } = props;

  const closeFiltersIcon =
    props.mobileMode === true ? (
      <i className="fas fa-times close" onClick={filterToggle} />
    ) : null;

  return (
    <div className="filter-wrapper hide" ref={filtersSidebarRef}>
      {props.mobileMode === false ? (
        <i
          className="fas fa-filter toggle"
          onClick={filterToggle}
          ref={filterToggleRef}
        />
      ) : null}
      <h2>
        <span>
          {labels[context.state.lang as string].pages.shop.filter.main}{' '}
          <i className="fas fa-filter" />
        </span>{' '}
        {closeFiltersIcon}
      </h2>
      <form className="filter-form">
        <div className="filter-option available">
          <label>
            {labels[context.state.lang as string].pages.shop.filter.available}
          </label>
          <input type="checkbox" onChange={inStockChanged} />
        </div>
        <div className="filter-option price-range">
          <label>
            {labels[context.state.lang as string].pages.shop.filter.price}
          </label>
          <div>
            <input
              type="number"
              onChange={priceFromChanged}
              className="priceFrom"
              placeholder={
                labels[context.state.lang as string].pages.shop.filter
                  .priceInputs.from
              }
              min="0"
            />
            -
            <input
              type="number"
              onChange={priceToChanged}
              className="priceTo"
              placeholder={
                labels[context.state.lang as string].pages.shop.filter
                  .priceInputs.to
              }
              min="0"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default productsFilter;
