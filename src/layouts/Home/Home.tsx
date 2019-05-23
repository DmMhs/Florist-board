import React, { Component } from 'react';

import { homeImagesRef } from '../../firebase';
import Spinner from '../../components/Spinner/Spinner';
import Slider from '../../components/Slider/Slider';
import './Home.less';

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

  public componentDidMount() {
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

  public render() {
    const { bannerImages } = this.state;
    return (
      <div className="Home">
        {bannerImages.length <= 0 ? <Spinner /> : null}
        <div className="slider-wrapper">
          <Slider
            images={bannerImages}
            auto={true}
            showControls={true}
            bannerModeEnabled={true}
          />
        </div>
      </div>
    );
  }
}

export default Home;
