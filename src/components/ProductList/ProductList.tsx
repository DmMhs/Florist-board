import React, { Component } from 'react';
import ProductCard from './ProductCard/ProductCard';

import { CartItem } from '../../models/CartItem';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import ProductsFilter from './ProductsFilter/ProductsFilter';
import ProductsSort from './ProductsSort/ProductsSort';
import sortByName from '../../services/sortByName';
import sortByPrice from '../../services/sortByPrice';
import Popup from '../Popup/Popup';
import { AppContext } from '../../AppContext';
import labels from '../../config/labels';

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
  mobileFiltersMode: boolean;
  popupMessages: Array<{ id: string; el: JSX.Element }>;
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

  public componentDidMount() {
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

  public componentWillUnmount() {
    window.removeEventListener('resize', resizeListener);
  }

  private addToCartClickedHandler = (productData: CartItem) => {
    const context = this.context;
    const removePopup = () => {
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
    };
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
      if (context.state.lang === 'uk') {
        this.setState(
          {
            popupMessages: [
              ...this.state.popupMessages,
              {
                id: productData.id,
                el: (
                  <Popup
                    type="success"
                    message={`Продукт "${
                      productData.title_uk
                    }" було додано у кошик`}
                    key={productData.id}
                  />
                )
              }
            ]
          },
          removePopup
        );
      } else {
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
          removePopup
        );
      }
    }
  };

  private toggleCartClickedHandler = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    this.setState({
      showCart: !this.state.showCart
    });
  };

  private closeCartClickedHandler = () => {
    this.setState({
      showCart: false
    });
  };
  private handleRemoveCartItem = (index: number) => {
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

  private inStockChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      checkForAvailable: !this.state.checkForAvailable
    });
  };
  private priceFromChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const priceFilter = { ...this.state.filterByPrice };
    priceFilter.from = event.target.value === '' ? 0 : +event.target.value;
    this.setState({
      filterByPrice: priceFilter,
      checkForPrice: true
    });
  };

  private priceToChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const priceFilter = { ...this.state.filterByPrice };
    priceFilter.to = event.target.value === '' ? Infinity : +event.target.value;
    this.setState({
      filterByPrice: priceFilter,
      checkForPrice: true
    });
  };

  private sortOrderClickedHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    this.setState({
      sortOrder: this.state.sortOrder === 'inverse' ? 'default' : 'inverse'
    });
  };

  private orderByChangedHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const context = this.context;
    this.setState({
      sortBy:
        (event.target as HTMLAnchorElement).innerText ===
        labels[context.state.lang as string].pages.shop.sort.btn.byName
          ? 'name'
          : 'price'
    });
  };

  private orderByClickedHandler = () => {
    this.orderByOptionsRef.current!.classList.toggle('show');
  };

  private filterToggleClickedHandler = () => {
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

  public render() {
    const { products } = this.props;

    const {
      popupMessages,
      checkForAvailable,
      checkForPrice,
      filterByPrice,
      sortOrder,
      sortBy,
      cartProducts,
      showCart,
      mobileFiltersMode
    } = this.state;

    let productList = products.map((p: CartItem, index: number) => {
      return (
        <ProductCard
          title={p.title}
          title_uk={p.title_uk}
          images={p.images}
          price={p.price}
          currency={p.currency}
          available={p.available}
          key={index}
          id={p.id}
          inCart={p.inCart}
          likedBy={
            p.likedBy === undefined
              ? false
              : (p.likedBy as any).includes(this.context.state.userId)
          }
          addToCart={this.addToCartClickedHandler.bind(this, p as CartItem)}
        />
      );
    });

    const popups = popupMessages.map((p: { id: string; el: JSX.Element }) => {
      return p.el;
    });

    if (checkForAvailable === true) {
      productList = productList.filter(item => {
        return item.props.available === true;
      });
    }

    if (checkForPrice === true) {
      productList = productList.filter(item => {
        return (
          item.props.price >= filterByPrice.from &&
          item.props.price <= filterByPrice.to
        );
      });
    }

    if (sortBy === 'name') {
      productList =
        sortOrder === 'inverse'
          ? productList.sort(sortByName).reverse()
          : productList.sort(sortByName);
    }

    if (sortBy === 'price') {
      productList =
        sortOrder === 'inverse'
          ? productList.sort(sortByPrice).reverse()
          : productList.sort(sortByPrice);
    }

    return (
      <AppContext.Consumer>
        {value =>
          value && (
            <div className="main-wrapper">
              <div
                className="cart-toggle"
                onClick={this.toggleCartClickedHandler}
              >
                <i className="fas fa-shopping-basket" />
                <span>{cartProducts.length}</span>
              </div>
              <ShoppingCart
                cartItems={cartProducts}
                showCart={showCart}
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
                mobileMode={mobileFiltersMode}
              />
              <div className="ProductList full-width" ref={this.productListRef}>
                <ProductsSort
                  sortOrder={sortOrder}
                  sortOrderClicked={this.sortOrderClickedHandler}
                  orderByClicked={this.orderByClickedHandler}
                  sortBy={sortBy}
                  orderByOptionsRef={this.orderByOptionsRef}
                  orderByChanged={this.orderByChangedHandler}
                  mobileMode={mobileFiltersMode}
                  filterToggle={this.filterToggleClickedHandler}
                />
                {productList}
              </div>
              <div className="popups-wrapper">{popups}</div>
            </div>
          )
        }
      </AppContext.Consumer>
    );
  }
}

ProductList.contextType = AppContext;
export default ProductList;
