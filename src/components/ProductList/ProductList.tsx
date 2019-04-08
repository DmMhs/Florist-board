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
}
class ProductList extends Component<ProductListProps, ProductListState> {
  constructor(props: ProductListProps) {
    super(props);
    this.state = {
      showCart: false,
      cartProducts: [],
      checkForAvailable: false,
      checkForPrice: false,
      filterByPrice: { from: 0, to: Infinity },
      sortBy: 'name',
      sortOrder: 'default'
    };
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
  orderByChangedHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      sortBy: this.state.sortBy === 'name' ? 'price' : 'name'
    });
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
        <div className="filter-wrapper">
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
        <div className="ProductList">
          <div className="sort-order">
            sort by{' '}
            <select onChange={this.orderByChangedHandler}>
              <option value="name">name</option>
              <option value="price">price</option>
            </select>
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
