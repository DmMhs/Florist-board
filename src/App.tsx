import React, { Component, RefObject } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.less';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Gallery from './components/Gallery/Gallery';
import contacts from './components/Contacts/Contacts';
import Home from './components/Home/Home';
import Toggle from './components/Toggle/Toggle';

interface AppProps {}
interface AppState {
  showNavigation: boolean;
  togglePosition: string;
}

let resizeListener: EventListener;

class App extends Component<AppProps, AppState> {
  private appRef: RefObject<HTMLDivElement>;
  constructor(props: AppProps) {
    super(props);
    this.state = {
      showNavigation: window.innerWidth > 576,
      togglePosition: 'absolute'
    };
    this.appRef = React.createRef();
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
      console.log('window width - ' + window.innerWidth);
      console.log('app width - ' + this.appRef.current!.clientWidth);
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
        <div className="App" ref={this.appRef}>
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
            <Route path="/contacts" component={contacts} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
