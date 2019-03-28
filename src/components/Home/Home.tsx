import React, { Component } from 'react';
import Slider from '../Slider/Slider';

import { homeImagesRef } from '../../firebase';

import './Home.less';
import Spinner from '../Spinner/Spinner';

interface HomeProps {}

interface HomeState {
  bannerImages: string[];
  isFetching: boolean;
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      bannerImages: [],
      isFetching: false
    };
  }
  componentDidMount() {
    homeImagesRef.on('value', snapshot => {
      this.setState({
        isFetching: true
      });
      const newImages: string[] = [];
      snapshot!.forEach(imgRef => {
        newImages.push(imgRef.val());
      });
      this.setState({
        bannerImages: newImages,
        isFetching: false
      });
    });
  }

  render() {
    return (
      <div className="Home">
        {this.state.bannerImages.length <= 0 ? <Spinner /> : null}
        <div className="slider-wrapper">
          <Slider
            images={this.state.bannerImages}
            auto={true}
            showControls={true}
          />
        </div>
      </div>
    );
  }
}

export default Home;
