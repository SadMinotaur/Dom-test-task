export const MonthsCollection = Array.apply(null, new Array(12)).map((_, i) => {
  const date = new Date();
  date.setMonth(i);
  return {
    number: i,
    short: date.toLocaleDateString('ru', {month: 'short'}).slice(0, 1),
    long: date.toLocaleDateString('ru'),
  };
});

type SelectMonthsArgs = {
  start?: number;
  end?: number;
};

export const selectMonths = ({start = 0, end = 0}: SelectMonthsArgs) => {
  return Array.apply(null, new Array(end - start)).map((_, i) => start + i);
};

export const monthPercent = 100 / 12;
export const springConfig = {
  damping: 20,
  stiffness: 90,
};
