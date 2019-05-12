import React, { Component } from 'react';

import './Modal.less';
import LeftArrow from '../../../components/Slider/LeftArrow/LeftArrow';
import RightArrow from '../../../components/Slider/RightArrow/RightArrow';

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
  public static getDerivedStateFromProps(props: ModalProps, state: ModalState) {
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

  public componentDidMount() {
    const { images, initial } = this.props;
    this.setState({
      activeSlide: images[initial]
    });
  }

  public render() {
    const {
      closeModal,
      prevClickedHandler,
      nextClickedHandler,
      images
    } = this.props;

    const { activeSlide, current } = this.state;

    return (
      <div className="Modal">
        <div className="modal-content">
          <i className="fas fa-times close" onClick={closeModal} />
          <div className="slide-wrapper">
            {activeSlide !== null ? activeSlide : null}
          </div>
          <LeftArrow goToPrevSlide={prevClickedHandler} show={true} />
          <RightArrow goToNextSlide={nextClickedHandler} show={true} />
          <span className="current-count">
            {current! + 1}/{images.length}
          </span>
        </div>
      </div>
    );
  }
}

export default Modal;
