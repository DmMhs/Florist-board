import React, { Component } from 'react';

import Slide from './Slide/Slide';
import './Slider.less';

let interval: any;
class Slider extends Component {
  state = {
    images: [
      'assets/images/florist-cut.png',
      'assets/images/Florist-banner-cutted.jpg',
      'assets/images/florist-cut.png',
      'assets/images/Florist-banner-cutted.jpg'
    ],
    currentIndex: 0,
    translateValue: 0,
    timerInterval: 6000
  };

  componentDidMount() {
    interval = window.setInterval(this.goToNextSlide, this.state.timerInterval);
  }

  goToNextSlide = () => {
    if (this.state.currentIndex === this.state.images.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      });
    }

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      translateValue: this.state.translateValue + -this.slideWidth()
    });
  };
  componentWillUnmount() {
    window.clearInterval(interval);
  }
  slideWidth = () => {
    return document.querySelector('.Slide') ? document.querySelector('.Slide')!.clientWidth : 0;
  };

  render() {
    const slides = this.state.images.map((i: any, index: any) => {
      return <Slide key={index} imgSrc={i} />;
    });
    return (
      <div className="Slider">
        <div
          className="slides-wrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: 'transform ease-out 1s'
          }}
        >
          {slides}
        </div>
      </div>
    );
  }
}

export default Slider;
