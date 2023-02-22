import topButtons from './topButtons.json';
import {monthsCollection} from './utils';

export type TopBarStates = (typeof topButtons)[number];
export type AnimationContext = {startValue: number};
export type MonthType = (typeof monthsCollection)[number];
export interface SelectMonthsArgs {
  start?: number;
  end?: number;
}
