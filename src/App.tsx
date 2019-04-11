import React, { Component } from 'react';
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

interface AppProps {}
interface AppState {
  showNavigation: boolean;
  togglePosition: string;
  products: any;
}

let resizeListener: EventListener;

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      showNavigation: window.innerWidth > 576,
      togglePosition: 'absolute',
      products: []
    };
  }

  componentDidMount() {
    resizeListener = () => {
      if (window.innerWidth < 576) {
        this.setState({
          showNavigation: false
        });
      } else {
        this.setState({
          showNavigation: true
        });
      }
    };
    window.addEventListener('resize', resizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', resizeListener);
  }

  toggleClickedHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      showNavigation: !this.state.showNavigation
    });

    if (!(event.target as HTMLDivElement).classList.contains('active')) {
      (event.target as HTMLDivElement).classList.add('active');
      this.setState({
        togglePosition: 'fixed'
      });
    } else {
      (event.target as HTMLDivElement).classList.remove('active');
      this.setState({
        togglePosition: 'absolute'
      });
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Toggle
            click={this.toggleClickedHandler}
            style={{
              position:
                this.state.togglePosition === 'absolute' ? 'absolute' : 'fixed'
            }}
          />
          {this.state.showNavigation ? <Header /> : null}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/shop" component={Shop} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/product-details/:id" component={ProductDetails} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
