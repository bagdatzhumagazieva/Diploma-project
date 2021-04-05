import React, { useCallback, useEffect, useState } from 'react';
import { mapPropsToAttributes } from 'src/core/components';

import Typography from 'src/components/atoms/Typography';
import Select from 'src/components/molecules/Select';
import { DatePickerTypes, IDatePicker } from 'src/components/molecules/DatePicker/types';
import { IOption } from 'src/components/molecules/Select/types';
import { daySelectOptions, monthSelectOptions, yearSelectOptions } from 'src/components/molecules/DatePicker/consts';
import { Month, DateTypes } from 'src/components/molecules/DatePicker/enum';
import './index.scss';

function DatePicker(props: DatePickerTypes.IProps) {
  const { day, month, year, onChange, errorMessage } = props;
  const attributes = mapPropsToAttributes<DatePickerTypes.IProps>(
    props, 'date-picker',
  );
  const [curDate, setCurDate] = useState<IDatePicker>({ day, month, year });

  const getNumberOfDays = useCallback(
    (month:  Month):number => {
      switch (month) {
        case Month.FEBRUARY:
          return ifLeapYear(curDate.year || 0) ? 29 : 28;
        case Month.APRIL:
        case Month.JUNE:
        case Month.SEPTEMBER:
        case Month.NOVEMBER:
          return 30;
        default:
          return 31;
      }
    },
    [curDate.year]);

  useEffect(
    () => {
      if (!curDate.day) return;
      if (curDate.day > getNumberOfDays(curDate.month as Month || '')) {
        setCurDate({ ...curDate, day: +daySelectOptions[(getNumberOfDays(curDate.month as Month || '') - 1)].value });
      }
    },
    [curDate, getNumberOfDays],
  );

  useEffect(
    () => {
      setCurDate({ day, month, year });
    },
    [day, month, year],
  );

  const ifLeapYear = (year: number):boolean => {
    if (year % 4 === 0) {
      if (year % 100 !== 0) return true;
      return year % 400 === 0;
    }
    return false;
  };

  const handleSelectedOption = (option: IOption | null, name: string) => {
    if (!option) return;
    const { value } = option;
    const updatedValue = name === DateTypes.MONTH ? value as Month : +value;
    setCurDate(
      {
        ...curDate,
        [name]: updatedValue,
      },
    );
    onChange && onChange({ ...curDate, [name]: updatedValue });
  };

  return (
    <>
      <div {...attributes}>
        <Select
          name={DateTypes.DAY}
          classNames="date-picker__day-select"
          staticWidth
          setSelectedOption={handleSelectedOption}
          options={daySelectOptions.slice(0, getNumberOfDays(curDate.month as Month || ''))}
          selectedOption={{ value: `${curDate.day}`, name: `${curDate.day}` }}
        />
        <Select
          name={DateTypes.MONTH}
          staticWidth
          classNames="date-picker__month-select"
          setSelectedOption={handleSelectedOption}
          options={Object.keys(monthSelectOptions).map((n: string) => ({
            value: n,
            name: monthSelectOptions[n],
          }))}
          selectedOption={{ value: `${curDate.month}`, name: `${monthSelectOptions[curDate.month]}` }}
        />
        <Select
          name={DateTypes.YEAR}
          staticWidth
          classNames="date-picker__year-select"
          setSelectedOption={handleSelectedOption}
          options={yearSelectOptions}
          selectedOption={{ value: `${curDate.year}`, name: `${curDate.year}` }}
        />
    </div>
      {errorMessage && (
        <Typography
          className="color_red text-left mb-4"
          variant="xsmall"
        >
          {errorMessage}
        </Typography>
      )}
    </>
  );
}

export default DatePicker;
