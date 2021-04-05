import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DateRangePicker from 'src/components/molecules/DateRangePicker/index';

storiesOf('Date Range Picker', module)
  .add('basic', () => (
    <Router>
      <div style={{ backgroundColor: '#F4F5F9', height: 800, padding: 40 }}>
        <DateRangePicker />
      </div>
    </Router>
  ));
