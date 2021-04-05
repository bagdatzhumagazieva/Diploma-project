import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressBar from 'src/components/atoms/ProgressBar/index';

storiesOf('Progress Bar', module)
.add('basic', () => (
  <div className="container">
    <div className="d-flex flex-column">
      <ProgressBar
        percent={30}
        position="right"
      />
      <ProgressBar
        percent={60}
        label="Шмейбл"
      />
      <ProgressBar
        percent={100}
        regular
      />
    </div>
  </div>
));
