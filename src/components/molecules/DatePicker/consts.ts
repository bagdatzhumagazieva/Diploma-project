import { DateTypes, Month } from 'src/components/molecules/DatePicker/enum';
import { IOption } from 'src/components/molecules/Select/types';

export const monthSelectOptions = {
  [Month.JANUARY]: 'Январь',
  [Month.FEBRUARY]: 'Февраль',
  [Month.MARCH]: 'Март',
  [Month.APRIL]: 'Апрель',
  [Month.MAY]: 'Май',
  [Month.JUNE]: 'Июнь',
  [Month.JULY]: 'Июль',
  [Month.AUGUST]: 'Август',
  [Month.SEPTEMBER]: 'Сентябрь',
  [Month.OCTOBER]: 'Октябрь',
  [Month.NOVEMBER]: 'Ноябрь',
  [Month.DECEMBER]: 'Декабрь',
};

const createArrayOptions = (value: number, type: DateTypes.MONTH | DateTypes.YEAR):IOption[] => {
  if (type === DateTypes.MONTH) {
    return [...Array(value)].map((_, i) => ({
      value: `${i + 1}`,
      name: `${i + 1}`,
    }));
  }
  const startYear = 1900;
  return [...Array(value - startYear + 1)].map((_, i) => ({
    value: `${startYear + i}`,
    name: `${startYear + i}`,
  }));
};

export const daySelectOptions = createArrayOptions(31, DateTypes.MONTH);
export const yearSelectOptions = createArrayOptions(new Date().getFullYear(), DateTypes.YEAR);
