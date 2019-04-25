import React, { Component } from 'react';

import './Modal.less';
import LeftArrow from '../../Slider/LeftArrow/LeftArrow';
import RightArrow from '../../Slider/RightArrow/RightArrow';

interface ModalProps {
  images: JSX.Element[];
  initial: number;
  prevClickedHandler:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  nextClickedHandler:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  closeModal:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}
interface ModalState {
  activeSlide: JSX.Element | null;
  current: number | null;
}

class Modal extends Component<ModalProps, ModalState> {
  static getDerivedStateFromProps(props: ModalProps, state: ModalState) {
    const { images, initial } = props;
    return {
      activeSlide: images[initial],
      current: initial
    };
  }
  constructor(props: ModalProps) {
    super(props);
    this.state = {
      activeSlide: null,
      current: null
    };
  }

  componentDidMount() {
    const { images, initial } = this.props;
    this.setState({
      activeSlide: images[initial]
    });
  }

  render() {
    return (
      <div className="Modal">
        <div className="modal-content">
          <i className="fas fa-times close" onClick={this.props.closeModal} />
          <div className="slide-wrapper">
            {this.state.activeSlide !== null ? this.state.activeSlide : null}
          </div>
          <LeftArrow
            goToPrevSlide={this.props.prevClickedHandler}
            show={true}
          />
          <RightArrow
            goToNextSlide={this.props.nextClickedHandler}
            show={true}
          />
          <span className="current-count">
            {this.state.current! + 1}/{this.props.images.length}
          </span>
        </div>
      </div>
    );
  }
}

export default Modal;
