export enum Month {
  JANUARY = 'january',
  FEBRUARY = 'february',
  MARCH = 'march',
  APRIL = 'april',
  MAY = 'may',
  JUNE = 'june',
  JULY = 'july',
  AUGUST = 'august',
  SEPTEMBER = 'september',
  OCTOBER = 'october',
  NOVEMBER = 'november',
  DECEMBER = 'december',
}

export enum DateTypes {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

export const getMonth = (month: number) => {
  if (month === 1) return Month.JANUARY;
  if (month === 2) return Month.FEBRUARY;
  if (month === 3) return Month.MARCH;
  if (month === 4) return Month.APRIL;
  if (month === 5) return Month.MAY;
  if (month === 6) return Month.JUNE;
  if (month === 7) return Month.JULY;
  if (month === 8) return Month.AUGUST;
  if (month === 9) return Month.SEPTEMBER;
  if (month === 10) return Month.OCTOBER;
  if (month === 11) return Month.NOVEMBER;
  return Month.DECEMBER;
};

export const getMonthCode = (month: Month): number => {
  if (month === Month.JANUARY) return 1;
  if (month === Month.FEBRUARY) return 2;
  if (month === Month.MARCH) return 3;
  if (month === Month.APRIL) return 4;
  if (month === Month.MAY) return 5;
  if (month === Month.JUNE) return 6;
  if (month === Month.JULY) return 7;
  if (month === Month.AUGUST) return 8;
  if (month === Month.SEPTEMBER) return 9;
  if (month === Month.OCTOBER) return 10;
  if (month === Month.NOVEMBER) return 11;
  return 12;
};
