import React, { Component } from 'react';

import { homeImagesRef, database } from '../../firebase';
import Spinner from '../../components/Spinner/Spinner';
import Slider from '../../components/Slider/Slider';
import './Home.less';

interface HomeProps {}

interface HomeState {
  bannerImages: string[];
  isFetching: boolean;
  sliderWrapperWidth: string;
  sliderWrapperHeight: string;
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      bannerImages: [],
      isFetching: false,
      sliderWrapperHeight: '',
      sliderWrapperWidth: ''
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
        bannerImages: newImages
      });
      database.ref('banner-params').on('value', snapshot2 => {
        this.setState({
          sliderWrapperHeight: snapshot2!.val().desktopBannerWrapperHeight,
          sliderWrapperWidth: snapshot2!.val().desktopBannerWrapperWidth,
          isFetching: false
        });
      });
    });
  }

  public render() {
    const {
      bannerImages,
      sliderWrapperWidth,
      sliderWrapperHeight
    } = this.state;
    return (
      <div className="Home">
        {bannerImages.length <= 0 ? <Spinner /> : null}
        <div
          className="slider-wrapper"
          style={{ width: sliderWrapperWidth, height: sliderWrapperHeight }}
        >
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
