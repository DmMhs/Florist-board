import React, { Component } from 'react';
import ProductCard from './ProductCard/ProductCard';

import { CartItem } from '../../models/CartItem';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

import './ProductList.less';
import ProductsFilter from './ProductsFilter/ProductsFilter';
import ProductsSort from './ProductsSort/ProductsSort';
import sortByName from '../../services/sortByName';
import sortByPrice from '../../services/sortByPrice';
import Popup from '../Popup/Popup';

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
  mobileFiltersMode: boolean;
  popupMessages: { id: string; el: JSX.Element }[];
}

let resizeListener: EventListener;

class ProductList extends Component<ProductListProps, ProductListState> {
  private orderByOptionsRef: React.RefObject<HTMLDivElement>;
  private filtersSidebarRef: React.RefObject<HTMLDivElement>;
  private productListRef: React.RefObject<HTMLDivElement>;
  public filterToggleRef: React.RefObject<HTMLDivElement>;
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
      showFilters: false,
      mobileFiltersMode: false,
      popupMessages: []
    };
    this.orderByOptionsRef = React.createRef();
    this.filtersSidebarRef = React.createRef();
    this.productListRef = React.createRef();
    this.filterToggleRef = React.createRef();
  }

  componentDidMount() {
    if (window.innerWidth <= 920) {
      this.setState({
        mobileFiltersMode: true
      });
    } else {
      this.setState({
        mobileFiltersMode: false
      });
    }
    resizeListener = () => {
      if (window.innerWidth <= 920) {
        this.setState({
          mobileFiltersMode: true
        });
      } else {
        this.setState({
          mobileFiltersMode: false
        });
      }
    };
    window.addEventListener('resize', resizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', resizeListener);
  }

  addToCartClickedHandler = (productData: CartItem) => {
    console.log('add to cart');
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
      this.setState(
        {
          popupMessages: [
            ...this.state.popupMessages,
            {
              id: productData.id,
              el: (
                <Popup
                  type="success"
                  message={`Product "${
                    productData.title
                  }" was added to the cart`}
                  key={productData.id}
                />
              )
            }
          ]
        },
        () => {
          const timer = setTimeout(() => {
            const newPopupMessages = [...this.state.popupMessages];
            const index = newPopupMessages.findIndex(
              (i: { id: string; el: JSX.Element }) => {
                return i.id === productData.id;
              }
            );
            newPopupMessages.splice(index, 1);
            this.setState({
              popupMessages: newPopupMessages
            });
          }, 3000);
        }
      );
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
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      this.state.cartProducts[index].inCart = false;
      this.state.cartProducts[index].amount = 1;
      const newProducts = [...this.state.cartProducts];
      newProducts.splice(index, 1);
      this.setState({
        cartProducts: newProducts
      });
    }
  };
  inStockChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      checkForAvailable: !this.state.checkForAvailable
    });
  };
  priceFromChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const priceFilter = { ...this.state.filterByPrice };
    priceFilter.from = event.target.value === '' ? 0 : +event.target.value;
    this.setState({
      filterByPrice: priceFilter,
      checkForPrice: true
    });
  };

  priceToChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const priceFilter = { ...this.state.filterByPrice };
    priceFilter.to = event.target.value === '' ? Infinity : +event.target.value;
    this.setState({
      filterByPrice: priceFilter,
      checkForPrice: true
    });
  };
  sortOrderClickedHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
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
    if (this.filterToggleRef.current === null) {
      this.setState({
        showFilters: !this.state.showFilters
      });
      this.filtersSidebarRef.current!.classList.toggle('hide');
      this.productListRef.current!.classList.toggle('full-width');
    } else {
      this.setState({
        showFilters: !this.state.showFilters
      });
      this.filtersSidebarRef.current!.classList.toggle('hide');
      this.productListRef.current!.classList.toggle('full-width');
    }
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
          addToCart={this.addToCartClickedHandler.bind(this, p as CartItem)}
        />
      );
    });
    const popups = this.state.popupMessages.map(
      (p: { id: string; el: JSX.Element }) => {
        return p.el;
      }
    );
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
      productList =
        this.state.sortOrder === 'inverse'
          ? productList.sort(sortByName).reverse()
          : productList.sort(sortByName);
    }
    if (this.state.sortBy === 'price') {
      productList =
        this.state.sortOrder === 'inverse'
          ? productList.sort(sortByPrice).reverse()
          : productList.sort(sortByPrice);
    }
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
        <ProductsFilter
          filterToggle={this.filterToggleClickedHandler}
          filtersSidebarRef={this.filtersSidebarRef}
          filterToggleRef={this.filterToggleRef}
          inStockChanged={this.inStockChangedHandler}
          priceFromChanged={this.priceFromChangedHandler}
          priceToChanged={this.priceToChangedHandler}
          mobileMode={this.state.mobileFiltersMode}
        />
        <div className="ProductList full-width" ref={this.productListRef}>
          <ProductsSort
            sortOrder={this.state.sortOrder}
            sortOrderClicked={this.sortOrderClickedHandler}
            orderByClicked={this.orderByClickedHandler}
            sortBy={this.state.sortBy}
            orderByOptionsRef={this.orderByOptionsRef}
            orderByChanged={this.orderByChangedHandler}
            mobileMode={this.state.mobileFiltersMode}
            filterToggle={this.filterToggleClickedHandler}
          />
          {productList}
        </div>
        <div className="popups-wrapper">{popups}</div>
      </div>
    );
  }
}

export default ProductList;
