import React, { Component, ChangeEvent } from 'react';
import ProductCard from './ProductCard/ProductCard';

import { CartItem } from '../../models/CartItem';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

import './ProductList.less';

interface ProductListProps {
  products: CartItem[];
}
interface ProductListState {
  showCart: boolean;
  cartProducts: CartItem[];
  checkForAvailable: boolean;
  checkForPrice: boolean;
  filterByPrice: {
    from: number | string;
    to: number | string;
  };
  sortBy: string;
  sortOrder: string;
  showFilters: boolean;
}
class ProductList extends Component<ProductListProps, ProductListState> {
  private orderByOptionsRef: React.RefObject<HTMLDivElement>;
  private filtersSidebarRef: React.RefObject<HTMLDivElement>;
  private productListRef: React.RefObject<HTMLDivElement>;
  private filterToggleRef: React.RefObject<HTMLDivElement>;
  constructor(props: ProductListProps) {
    super(props);
    this.state = {
      showCart: false,
      cartProducts: [],
      checkForAvailable: false,
      checkForPrice: false,
      filterByPrice: { from: 0, to: Infinity },
      sortBy: 'name',
      sortOrder: 'default',
      showFilters: false
    };
    this.orderByOptionsRef = React.createRef();
    this.filtersSidebarRef = React.createRef();
    this.productListRef = React.createRef();
    this.filterToggleRef = React.createRef();
  }

  addToCartClickedHandler = (productData: CartItem) => {
    if (productData.available) {
      const cartProducts = this.state.cartProducts;
      const index = cartProducts.findIndex((i: CartItem) => {
        return i.id === productData.id;
      });
      const isInCart = index !== -1 ? true : false;
      if (!isInCart) {
        productData.inCart = true;
        this.setState({
          cartProducts: [...cartProducts, productData]
        });
      }
    }
  };
  toggleCartClickedHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      showCart: !this.state.showCart
    });
  };
  closeCartClickedHandler = () => {
    this.setState({
      showCart: false
    });
  };
  handleRemoveCartItem = (index: number) => {
    this.state.cartProducts[index].inCart = false;
    this.state.cartProducts[index].amount = 1;
    const newProducts = [...this.state.cartProducts];
    newProducts.splice(index, 1);
    this.setState({
      cartProducts: newProducts
    });
  };
  inStockChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      checkForAvailable: !this.state.checkForAvailable
    });
  };
  priceFromChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let priceFilter = { ...this.state.filterByPrice };
    priceFilter.from = event.target.value === '' ? 0 : +event.target.value;
    this.setState({
      filterByPrice: priceFilter,
      checkForPrice: true
    });
  };

  priceToChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let priceFilter = { ...this.state.filterByPrice };
    priceFilter.to = event.target.value === '' ? Infinity : +event.target.value;
    this.setState({
      filterByPrice: priceFilter,
      checkForPrice: true
    });
  };
  sortOrderClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.setState({
      sortOrder: this.state.sortOrder === 'inverse' ? 'default' : 'inverse'
    });
  };
  orderByChangedHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    this.setState({
      sortBy:
        (event.target as HTMLAnchorElement).innerText === 'name'
          ? 'name'
          : 'price'
    });
  };
  orderByClickedHandler = () => {
    this.orderByOptionsRef.current!.classList.toggle('show');
  };
  filterToggleClickedHandler = () => {
    if (this.state.showFilters === false) {
      this.filterToggleRef.current!.classList.remove('fa-angle-double-right');
      this.filterToggleRef.current!.classList.add('fa-angle-double-left');
    } else {
      this.filterToggleRef.current!.classList.remove('fa-angle-double-left');
      this.filterToggleRef.current!.classList.add('fa-angle-double-right');
    }
    this.setState({
      showFilters: !this.state.showFilters
    });
    this.filtersSidebarRef.current!.classList.toggle('hide');
    this.productListRef.current!.classList.toggle('full-width');
  };
  render() {
    const { products } = this.props;
    let productList = products.map((p: CartItem, index: number) => {
      return (
        <ProductCard
          title={p.title}
          images={p.images}
          price={p.price}
          currency={p.currency}
          available={p.available}
          key={index}
          id={p.id}
          inCart={p.inCart}
          addToCart={() => this.addToCartClickedHandler(p as CartItem)}
        />
      );
    });
    if (this.state.checkForAvailable === true) {
      productList = productList.filter(item => {
        return item.props.available === true;
      });
    }
    if (this.state.checkForPrice === true) {
      productList = productList.filter(item => {
        return (
          item.props.price >= this.state.filterByPrice.from &&
          item.props.price <= this.state.filterByPrice.to
        );
      });
    }
    if (this.state.sortBy === 'name') {
      productList = productList.sort((a: JSX.Element, b: JSX.Element) => {
        if (a.props.title > b.props.title) {
          return 1;
        }
        if (a.props.title < b.props.title) {
          return -1;
        }
        return 0;
      });
      if (this.state.sortOrder === 'inverse') {
        productList.reverse();
      }
    }
    if (this.state.sortBy === 'price') {
      productList = productList.sort((a: JSX.Element, b: JSX.Element) => {
        return a.props.price - b.props.price;
      });
      if (this.state.sortOrder === 'inverse') {
        productList.reverse();
      }
    }
    const sortByNameOrderIcon =
      this.state.sortOrder === 'default' ? (
        <i className="fas fa-sort-alpha-down" onClick={this.sortOrderClicked} />
      ) : (
        <i className="fas fa-sort-alpha-up" onClick={this.sortOrderClicked} />
      );
    const sortByPriceOrderIcon =
      this.state.sortOrder === 'default' ? (
        <i
          className="fas fa-sort-numeric-down"
          onClick={this.sortOrderClicked}
        />
      ) : (
        <i className="fas fa-sort-numeric-up" onClick={this.sortOrderClicked} />
      );
    return (
      <div className="main-wrapper">
        <div className="cart-toggle" onClick={this.toggleCartClickedHandler}>
          <i className="fas fa-shopping-basket" />
          <span>{this.state.cartProducts.length}</span>
        </div>
        <ShoppingCart
          cartItems={this.state.cartProducts}
          showCart={this.state.showCart}
          closeCart={this.closeCartClickedHandler}
          remove={this.handleRemoveCartItem}
        />
        <div className="filter-wrapper hide" ref={this.filtersSidebarRef}>
          <i
            className="fas fa-angle-double-right toggle"
            onClick={this.filterToggleClickedHandler}
            ref={this.filterToggleRef}
          />
          <h2>
            Filters <i className="fas fa-filter" />
          </h2>
          <form className="filter-form">
            <div className="filter-option available">
              <label>IN STOCK</label>
              <input type="checkbox" onChange={this.inStockChangedHandler} />
            </div>
            <div className="filter-option price-range">
              <label>PRICE RANGE</label>
              <div>
                <input
                  type="number"
                  onChange={this.priceFromChangedHandler}
                  placeholder="from"
                  min="0"
                />
                -
                <input
                  type="number"
                  onChange={this.priceToChangedHandler}
                  placeholder="to"
                  min="0"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="ProductList full-width" ref={this.productListRef}>
          <div className="sort-order">
            sort by{' '}
            <div className="dropdown">
              <button onClick={this.orderByClickedHandler} className="dropbtn">
                {this.state.sortBy.toUpperCase()}{' '}
                <i className="fas fa-angle-down" />
              </button>
              <div ref={this.orderByOptionsRef} className="dropdown-content">
                <a href="#" onClick={this.orderByChangedHandler}>
                  name
                </a>
                <a href="#" onClick={this.orderByChangedHandler}>
                  price
                </a>
              </div>
            </div>
            {this.state.sortBy === 'name'
              ? sortByNameOrderIcon
              : sortByPriceOrderIcon}
          </div>
          {productList}
        </div>
      </div>
    );
  }
}

export default ProductList;
