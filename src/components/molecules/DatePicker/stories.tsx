import * as React from 'react';
import { storiesOf } from '@storybook/react';
import DatePicker from 'src/components/molecules/DatePicker/index';
import { DEFAULT_VALUES } from 'src/components/molecules/Cards/CardUserEditing/consts';

storiesOf('Date Picker', module)
  .add('basic', () => (
    <div className="container">
      <div className="d-flex flex-column" style={{ width: '358px' }}>
        <DatePicker {...DEFAULT_VALUES.date} classNames="d-flex justify-content-between"/>
        <DatePicker {...DEFAULT_VALUES.date} classNames="d-flex justify-content-between mt-32"/>
      </div>
    </div>
  ));
