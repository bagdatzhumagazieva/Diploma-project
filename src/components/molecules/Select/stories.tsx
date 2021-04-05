import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Select from 'src/components/molecules/Select';
import { daySelectOptions } from 'src/components/molecules/DatePicker/consts';

storiesOf('Select', module)
  .add('basic', () => (
    <div className="container">
      <div className="d-flex p-5 w-50">
        <Select name="month" options={daySelectOptions} selectedOption={daySelectOptions[0]} />
      </div>
    </div>
  ));
