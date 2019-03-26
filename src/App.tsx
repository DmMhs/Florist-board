import React, { Component, RefObject } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.less';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Gallery from './components/Gallery/Gallery';
import contacts from './components/Contacts/Contacts';
import Home from './components/Home/Home';

interface AppProps {}
interface AppState {
  showNavigation: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      showNavigation: window.innerWidth > 576
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 576) {
        this.setState({
          showNavigation: false
        });
      } else {
        this.setState({
          showNavigation: true
        });
      }
    });
  }

  toggleClickedHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      showNavigation: !this.state.showNavigation
    });

    if (!(event.target as HTMLDivElement).classList.contains('active')) {
      (event.target as HTMLDivElement).classList.add('active');
    } else {
      (event.target as HTMLDivElement).classList.remove('active');
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <i
            className="fas fa-ellipsis-h"
            id="toggle"
            onClick={this.toggleClickedHandler}
          />
          {this.state.showNavigation ? <Header /> : null}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/shop" component={Shop} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/contacts" component={contacts} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
