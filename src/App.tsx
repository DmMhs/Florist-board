import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.less';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Gallery from './components/Gallery/Gallery';
import contacts from './components/Contacts/Contacts';
import Home from './components/Home/Home';

class App extends Component {
  state = {
    showNavigation: false
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

  toggleClickedHandler = () => {
    this.setState({
      showNavigation: !this.state.showNavigation
    });
    if (this.state.showNavigation) {
      document.getElementById('toggle')!.classList.add('active');
    } else {
      document.getElementById('toggle')!.classList.remove('active');
    }
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <i className="fas fa-ellipsis-h" id="toggle" onClick={this.toggleClickedHandler}></i>
          { this.state.showNavigation ? <Header /> : null }
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
