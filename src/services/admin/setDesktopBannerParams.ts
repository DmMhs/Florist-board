import { database } from '../../firebase';

export const setDesktopBannerParams = (width: string, height: string) => {
  return database.ref('banner-params').set({
    desktopBannerWrapperHeight: height,
    desktopBannerWrapperWidth: width
  });
};
