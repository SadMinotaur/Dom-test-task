import {Dimensions, PixelRatio} from 'react-native';

export const TargetWidth = 375;

export const getScale = (deviceWidth: number): number =>
  TargetWidth / deviceWidth;

export const value = (size: number): number => {
  const {width} = Dimensions.get('window');
  const scale = getScale(width);
  return Math.round(PixelRatio.roundToNearestPixel(size / scale));
};
