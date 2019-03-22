import React, { Component } from 'react';

import Slide from './Slide/Slide';
import './Slider.less';

class Slider extends Component {
  state = {
    images: [
      'assets/images/florist-cut.png',
      'assets/images/Florist-banner-cutted.jpg'
    ],
    timer: {
      speed: 6000
    },
    currentImage: 0
  };

  componentDidMount() {
    setInterval(this.nextSlide, this.state.timer.speed);
  }

  nextSlide = () => {
    if (this.state.currentImage >= this.state.images.length - 1) {
      this.setState({
        currentImage: 0
      });
    } else {
      this.setState({
        currentImage: this.state.currentImage + 1
      });
    }
  };

  render() {
    let current = this.state.currentImage;

    const slides = this.state.images.map((i: any, index: any) => {
      return (
        <Slide
          key={index}
          imgSrc={i}
          visible={index === current ? true : false}
        />
      );
    });
    return (
      <div className="Slider">
        <div className="slides-wrapper">{slides}</div>
      </div>
    );
  }
}

export default Slider;
