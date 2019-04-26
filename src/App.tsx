import React, { Component, RefObject } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.less';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Gallery from './components/Gallery/Gallery';
import Contacts from './components/Contacts/Contacts';
import Home from './components/Home/Home';
import Toggle from './components/Toggle/Toggle';
import ProductDetails from './components/ProductList/ProductDetails/ProductDetails';
import Auth from './components/Auth/Auth';
import AppContextProvider from './AppContext';
import Footer from './components/Footer/Footer';
import PageNotFound from './components/PageNotFound/PageNotFound';

interface AppProps {}
interface AppState {
  showNavigation: boolean;
  togglePosition: string;
  products: any;
}

let resizeListener: EventListener;

class App extends Component<AppProps, AppState> {
  private toggleRef: RefObject<HTMLDivElement>;
  constructor(props: AppProps) {
    super(props);
    this.state = {
      showNavigation: window.innerWidth > 768,
      togglePosition: 'absolute',
      products: []
    };
    this.toggleRef = React.createRef();
  }

  public componentDidMount() {
    if (localStorage.floristAuthLogin === undefined) {
      localStorage.setItem('floristAuthLogin', '');
    }
    if (localStorage.floristAuthToken === undefined) {
      localStorage.setItem('floristAuthToken', '');
    }
    if (localStorage.floristAuthUserId === undefined) {
      localStorage.setItem('floristAuthUserId', '');
    }
    if (localStorage.floristAuthMethod === undefined) {
      localStorage.setItem('floristAuthUserId', '');
    }
    resizeListener = () => {
      if (this.toggleRef.current!.classList.contains('active')) {
        this.toggleRef.current!.classList.remove('active');
      }
      if (window.innerWidth <= 768) {
        this.setState({
          showNavigation: false,
          togglePosition: 'absolute'
        });
      } else {
        this.setState({
          showNavigation: true,
          togglePosition: 'absolute'
        });
      }
    };
    window.addEventListener('resize', resizeListener);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', resizeListener);
  }

  public toggleClickedHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!(event.target as HTMLDivElement).classList.contains('active')) {
      this.setState({
        showNavigation: !this.state.showNavigation,
        togglePosition: 'fixed'
      });
    } else {
      this.setState({
        showNavigation: !this.state.showNavigation,
        togglePosition: 'absolute'
      });
    }
    (event.target as HTMLDivElement).classList.toggle('active');
  };

  public render() {
    return (
      <BrowserRouter>
        <AppContextProvider>
          <div className="App">
            <Toggle
              click={this.toggleClickedHandler}
              style={{
                position:
                  this.state.togglePosition === 'absolute'
                    ? 'absolute'
                    : 'fixed'
              }}
              ref={this.toggleRef}
            />
            {this.state.showNavigation ? <Header /> : null}
            {localStorage.floristAuth !== undefined
              ? JSON.parse(localStorage.floristAuth).email
              : null}

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/shop" component={Shop} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/contacts" component={Contacts} />
              <Route path="/product-details/:id" component={ProductDetails} />
              <Route path="/auth/:mode" component={Auth} />
              <Route component={PageNotFound} />
            </Switch>
            <Footer />
          </div>
        </AppContextProvider>
      </BrowserRouter>
    );
  }
}

export default App;
