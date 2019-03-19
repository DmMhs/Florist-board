import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Gallery from './components/Gallery/Gallery';
import contacts from './components/Contacts/Contacts';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/shop" component={Shop}/>
            <Route path="/gallery" component={Gallery}/>
            <Route path="/contacts" component={contacts}/>
          </Switch>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
