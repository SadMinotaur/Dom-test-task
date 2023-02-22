import {Dimensions} from 'react-native';
import {SelectMonthsArgs} from './types';

export const monthsCollection = Array.apply(null, new Array(12)).map((_, i) => {
  const date = new Date();
  date.setMonth(i);
  return {
    number: i,
    short: date.toLocaleDateString('ru', {month: 'short'}).slice(0, 1),
    long: date.toLocaleDateString('ru'),
  };
});

export const selectMonths = ({start = 0, end = 0}: SelectMonthsArgs) => {
  return Array.apply(null, new Array(Math.round(end - start))).map(
    (_, i) => start + i,
  );
};

export const monthPercent = 100 / 12;

export const monthScreenPart = Dimensions.get('screen').width / 12;

export const springConfig = {
  damping: 15,
  stiffness: 200,
};
