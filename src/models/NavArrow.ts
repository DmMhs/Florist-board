import React from 'react';

export interface NavArrow {
  show: boolean;
  goToNextSlide?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  goToPrevSlide?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}
