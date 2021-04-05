import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import Calendar from 'react-calendar';
import Typography from 'src/components/atoms/Typography';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import 'react-calendar/dist/Calendar.css';
import { DateCalendarTypes } from 'src/components/molecules/DateCalendar/types';
import 'src/components/molecules/DateCalendar/index.scss';

function DateCalendar(props: DateCalendarTypes.IProps) {
  const { date, setDate } = props;
  const [showCalendar, setShowCalendar] = useState<boolean>(true);

  return (
    <div className="date-calendar">
      <div
        onClick={() => setShowCalendar(!showCalendar)}
        className="date-calendar__header py-12 px-16 d-flex justify-content-between align-items-center"
      >
        <Typography variant="text">
          {moment(date).format('DD.MM.YYYY') || 'Выберите дату'}
        </Typography>
        <FilterArrow
          direction={showCalendar ? 'up' : 'down'}
        />
      </div>
      {showCalendar && (
        <Calendar
          onChange={setDate}
          value={date}
          className="mt-8"
        />
      )}
    </div>
  );
}

export default DateCalendar;
