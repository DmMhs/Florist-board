import React, { useContext } from 'react';

import labels from '../../../config/labels';
import { AppContext } from '../../../AppContext';

import './ProductsFilter.less';
import { withRouter, RouteComponentProps } from 'react-router';

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

const productsFilter = (
  props: RouteComponentProps<{}> & ProductsFilterProps
) => {
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

  const labelsRoot = labels[context.state.lang as string].pages.shop.filter;

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
          {labelsRoot.main} <i className="fas fa-filter" />
        </span>{' '}
        {closeFiltersIcon}
      </h2>
      <form className="filter-form">
        <div className="filter-option available">
          <label>{labelsRoot.available}</label>
          <input type="checkbox" onChange={inStockChanged} />
        </div>
        <div className="filter-option price-range">
          <label>{labelsRoot.price}</label>
          <div>
            <input
              type="number"
              onChange={priceFromChanged}
              className="priceFrom"
              placeholder={labelsRoot.priceInputs.from}
              min="0"
            />
            -
            <input
              type="number"
              onChange={priceToChanged}
              className="priceTo"
              placeholder={labelsRoot.priceInputs.to}
              min="0"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter<RouteComponentProps<{}> & ProductsFilterProps>(
  productsFilter
);
