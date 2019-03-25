import React, { Component } from 'react';
import Slider from '../Slider/Slider';

import './Home.less';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Slider
          images={[
            'assets/images/florist-cut.png',
            'assets/images/Florist-banner-cutted.jpg',
            'assets/images/florist-cut.png',
            'assets/images/Florist-banner-cutted.jpg'
          ]}
        />
      </div>
    );
  }
}

export default Home;
