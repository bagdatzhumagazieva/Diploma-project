import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import ReactDateRangePicker from 'react-daterange-picker';
import { useOutsideClick } from 'src/hooks/useOutsideClick';

import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import Typography from 'src/components/atoms/Typography';

import { DateRangePickerTypes } from 'src/components/molecules/DateRangePicker/types';
import 'react-daterange-picker/dist/css/react-calendar.css';
import './index.scss';

function DateRangePicker(props: DateRangePickerTypes.IProps) {
  const { width, className, setDate, date } = props;
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const renderDateValue = (start: Moment, end: Moment) => {
    return `${start.format('YYYY-MM-DD')} - ${end.format('YYYY-MM-DD')}`;
  };

  useOutsideClick(datePickerRef, () =>  {
    if (showDatePicker) setShowDatePicker(false);
  });

  useEffect(
    () => {
      if (showDatePicker) {
        setShowDatePicker(false);
      }
    },
    [date],
  );

  return (
    <div
      ref={datePickerRef}
      className={classNames(
        'date-range-picker pos_relative', className,
        { 'date-range-picker--active': showDatePicker },
      )}
      style={{ width }}
    >
      <div
        className="date-range-picker__header px-16 d-flex justify-content-between align-items-center"
        onClick={() => setShowDatePicker(!showDatePicker)}
      >
        <Typography variant="text">
          {(date && date.start && date.end) ? renderDateValue(date.start, date.end) : 'Выберите промежуток' }
        </Typography>
        <FilterArrow
          direction={showDatePicker ? 'up' : 'down'}
        />
      </div>
      {showDatePicker && (
        <div
          className="date-range-picker__date-picker-wrapper pos_absolute fill_w mt-8 py-16"
        >
          <ReactDateRangePicker
            singleDateRange
            onSelect={setDate}
            value={date}
            locale={moment.locale('ru')}
            className="date-range-picker__date-picker"
          />
        </div>
      )}
    </div>
  );
}

export default DateRangePicker;
