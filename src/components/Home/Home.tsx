import React, { Component } from 'react';
import Slider from './Slider/Slider';

import './Home.less';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Slider />
      </div>
    );
  }
}

export default Home;
